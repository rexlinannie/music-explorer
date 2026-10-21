import type { MusicItem } from "../../types/music";
import {
  Artwork,
  ArtworkFallback,
  Card,
  KindLabel,
  Metadata,
  ResultTitle,
} from "../../styles/ResultCard.styles";

export function ResultCard({ item }: { item: MusicItem }) {
  const year = item.releaseDate
    ? new Date(item.releaseDate).getFullYear()
    : null;
  return (
    <Card>
      {item.artworkUrl ? (
        <Artwork src={item.artworkUrl} alt="" loading="lazy" />
      ) : (
        <ArtworkFallback aria-hidden="true">♫</ArtworkFallback>
      )}
      <Metadata>
        <KindLabel $kind={item.kind}>{item.kind}</KindLabel>
        <ResultTitle title={item.title}>{item.title}</ResultTitle>
        <p>{item.kind === "artist" ? "Artist" : item.artistName}</p>
        {item.kind === "song" && item.collectionName && (
          <p className="collection">{item.collectionName}</p>
        )}
        {year && <span className="year">{year}</span>}
        {item.trackUrl && (
          <a href={item.trackUrl} target="_blank" rel="noreferrer">
            View on Apple Music <span aria-hidden="true">↗</span>
          </a>
        )}
      </Metadata>
    </Card>
  );
}
