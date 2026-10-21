import express, { type Request, type Response } from "express";
import path from "node:path";

const app = express();
const PORT = Number(process.env.PORT ?? 3001);
const projectRoot = process.cwd();

type ResultKind = "artist" | "album" | "song";
type MusicItem = {
  id: string;
  kind: ResultKind;
  title: string;
  artistName: string;
  artworkUrl?: string;
  collectionName?: string;
  releaseDate?: string;
  trackUrl?: string;
};
type AppleResult = {
  artistId?: number;
  collectionId?: number;
  trackId?: number;
  artistName?: string;
  collectionName?: string;
  trackName?: string;
  artworkUrl100?: string;
  releaseDate?: string;
  artistViewUrl?: string;
  collectionViewUrl?: string;
  trackViewUrl?: string;
};

function normalise(item: AppleResult, kind: ResultKind): MusicItem | null {
  const rawId =
    kind === "artist"
      ? item.artistId
      : kind === "album"
        ? item.collectionId
        : item.trackId;
  const title =
    kind === "artist"
      ? item.artistName
      : kind === "album"
        ? item.collectionName
        : item.trackName;
  if (rawId == null || !title) return null;
  return {
    id: `${kind}-${rawId}`,
    kind,
    title,
    artistName:
      item.artistName ?? (kind === "artist" ? title : "Unknown artist"),
    artworkUrl: item.artworkUrl100,
    collectionName: item.collectionName,
    releaseDate: item.releaseDate,
    trackUrl:
      kind === "artist"
        ? item.artistViewUrl
        : kind === "album"
          ? item.collectionViewUrl
          : item.trackViewUrl,
  };
}

app.get("/api/search", async (req: Request, res: Response) => {
  const term = String(req.query.term ?? "").trim();
  if (!term) {
    res.status(400).json({ message: "Please enter an artist, album or song." });
    return;
  }
  if (term.length > 100) {
    res
      .status(400)
      .json({ message: "Search terms must be 100 characters or fewer." });
    return;
  }

  const entities: Array<{ entity: string; kind: ResultKind }> = [
    { entity: "musicArtist", kind: "artist" },
    { entity: "album", kind: "album" },
    { entity: "song", kind: "song" },
  ];
  try {
    const groups = await Promise.all(
      entities.map(async ({ entity, kind }) => {
        const url = new URL("https://itunes.apple.com/search");
        url.searchParams.set("term", term);
        url.searchParams.set("media", "music");
        url.searchParams.set("entity", entity);
        url.searchParams.set("limit", "10000");
        const response = await fetch(url, {
          signal: AbortSignal.timeout(10000),
        });
        if (!response.ok)
          throw new Error(`Apple API returned ${response.status}`);
        const payload = (await response.json()) as { results?: AppleResult[] };
        return (payload.results ?? [])
          .map((item) => normalise(item, kind))
          .filter((item): item is MusicItem => item !== null);
      }),
    );
    const seen = new Set<string>();
    const results = groups.flat().filter((item) => {
      if (seen.has(item.id)) return false;
      seen.add(item.id);
      return true;
    });
    res.json({ results });
  } catch (error) {
    console.error("Music search failed:", error);
    res.status(502).json({
      message: "Music search is temporarily unavailable. Please try again.",
    });
  }
});

app.use(express.static(path.join(projectRoot, "dist")));
app.get("*", (_req, res) => {
  res.sendFile(path.join(projectRoot, "dist", "index.html"), (error) => {
    if (error)
      res.status(404).send("Frontend build not found. Run pnpm build first.");
  });
});

app.listen(PORT, () =>
  console.log(
    `Music Explorer server listening on http://localhost:${PORT} and frontend app is available at http://localhost:5173`,
  ),
);
