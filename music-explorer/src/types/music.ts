export type ResultKind = "artist" | "album" | "song";
export type MusicItem = {
  id: string;
  kind: ResultKind;
  title: string;
  artistName: string;
  artworkUrl?: string;
  collectionName?: string;
  releaseDate?: string;
  trackUrl?: string;
};
export type SearchStatus = "idle" | "loading" | "succeeded" | "failed";
