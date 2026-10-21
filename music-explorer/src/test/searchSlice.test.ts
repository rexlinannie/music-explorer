import reducer, {
  clearSearch,
  searchMusic,
  showNextPage,
} from "../features/search/searchSlice";
import type { MusicItem } from "../types/music";
const item = (id: number): MusicItem => ({
  id: `song-${id}`,
  kind: "song",
  title: `Track ${id}`,
  artistName: "Test artist",
});

describe("search reducer", () => {
  it("reveals results in batches of ten without exceeding the total", () => {
    const initial = {
      query: "test",
      results: Array.from({ length: 23 }, (_, i) => item(i + 1)),
      status: "succeeded" as const,
      error: null,
      visibleCount: 10,
    };
    const second = reducer(initial, showNextPage());
    expect(second.visibleCount).toBe(20);
    const third = reducer(second, showNextPage());
    expect(third.visibleCount).toBe(23);
    expect(reducer(third, showNextPage()).visibleCount).toBe(23);
  });
  it("clears the search state", () => {
    const state = reducer(
      {
        query: "Adele",
        results: [item(1)],
        status: "succeeded" as const,
        error: null,
        visibleCount: 10,
        currentRequestId: "abc",
      },
      clearSearch(),
    );
    expect(state.query).toBe("");
    expect(state.results).toEqual([]);
    expect(state.status).toBe("idle");
    expect(state.currentRequestId).toBeUndefined();
  });
  it("tracks the latest pending request", () => {
    const state = reducer(undefined, searchMusic.pending("request-1", "Adele"));
    expect(state.status).toBe("loading");
    expect(state.query).toBe("Adele");
    expect(state.currentRequestId).toBe("request-1");
  });
});
