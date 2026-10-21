import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { MusicItem } from "../../types/music";

type SearchState = {
  query: string;
  results: MusicItem[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
  visibleCount: number;
  currentRequestId?: string;
};

const initialState: SearchState = {
  query: "",
  results: [],
  status: "idle",
  error: null,
  visibleCount: 10,
};

export const searchMusic = createAsyncThunk<
  MusicItem[],
  string,
  { rejectValue: string }
>("search/searchMusic", async (query, { rejectWithValue, signal }) => {
  try {
    const response = await fetch(
      `/api/search?term=${encodeURIComponent(query)}`,
      { signal },
    );
    const payload: unknown = await response.json();
    if (!response.ok) {
      const message =
        typeof payload === "object" &&
        payload !== null &&
        "message" in payload &&
        typeof payload.message === "string"
          ? payload.message
          : "Search failed. Please try again.";
      return rejectWithValue(message);
    }
    if (
      typeof payload !== "object" ||
      payload === null ||
      !("results" in payload) ||
      !Array.isArray(payload.results)
    ) {
      return rejectWithValue(
        "The search service returned an unexpected response.",
      );
    }
    return payload.results as MusicItem[];
  } catch (error) {
    if (error instanceof DOMException && error.name === "AbortError")
      throw error;
    return rejectWithValue(
      "Unable to reach the music service. Please try again.",
    );
  }
});

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    showNextPage(state) {
      state.visibleCount = Math.min(
        state.visibleCount + 10,
        state.results.length,
      );
    },
    clearSearch(state) {
      state.query = "";
      state.results = [];
      state.status = "idle";
      state.error = null;
      state.visibleCount = 10;
      state.currentRequestId = undefined;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(searchMusic.pending, (state, action) => {
        state.query = action.meta.arg;
        state.status = "loading";
        state.error = null;
        state.results = [];
        state.visibleCount = 10;
        state.currentRequestId = action.meta.requestId;
      })
      .addCase(searchMusic.fulfilled, (state, action) => {
        if (state.currentRequestId !== action.meta.requestId) return;
        state.results = action.payload;
        state.status = "succeeded";
        state.error = null;
        state.visibleCount = 10;
        state.currentRequestId = undefined;
      })
      .addCase(searchMusic.rejected, (state, action) => {
        if (state.currentRequestId !== action.meta.requestId) return;
        state.status = "failed";
        state.error =
          action.payload ?? action.error.message ?? "Search failed.";
        state.currentRequestId = undefined;
      });
  },
});

export const { showNextPage, clearSearch } = searchSlice.actions;
export default searchSlice.reducer;
