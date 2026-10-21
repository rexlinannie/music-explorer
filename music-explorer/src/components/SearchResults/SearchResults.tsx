import { useEffect, useRef } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { showNextPage } from "../../features/search/searchSlice";
import { ResultCard } from "../ResultCard/ResultCard";
import {
  EmptyDescription,
  EmptyIcon,
  EmptyState,
  LoadMoreButton,
  ResultsGrid,
  ResultsHeader,
  ResultsSection,
  ResultsSummary,
  Sentinel,
} from "../../styles/SearchResults.styles";

export function SearchResults() {
  const dispatch = useAppDispatch();
  const { results, status, query, visibleCount } = useAppSelector(
    (state) => state.search,
  );
  const sentinelRef = useRef<HTMLDivElement>(null);
  const visibleResults = results.slice(0, visibleCount);
  const hasMore = visibleCount < results.length;

  useEffect(() => {
    const target = sentinelRef.current;
    if (!target || !hasMore || status !== "succeeded") return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting))
          dispatch(showNextPage());
      },
      { rootMargin: "180px 0px" },
    );
    observer.observe(target);
    return () => observer.disconnect();
  }, [dispatch, hasMore, status]);

  if (status === "idle")
    return (
      <EmptyState>
        <EmptyIcon aria-hidden="true">♫</EmptyIcon>
        <h2>Your soundtrack starts here</h2>
        <EmptyDescription>
          Search for an artist, album or song to explore the music library.
        </EmptyDescription>
      </EmptyState>
    );
  if (status === "succeeded" && results.length === 0)
    return (
      <EmptyState role="status">
        <EmptyIcon aria-hidden="true">⌕</EmptyIcon>
        <h2>No results found</h2>
        <EmptyDescription>
          We couldn’t find anything for “{query}”. Try a different artist, album
          or song.
        </EmptyDescription>
      </EmptyState>
    );
  if (status !== "succeeded" || results.length === 0) return null;

  return (
    <ResultsSection aria-label="Search results">
      <ResultsHeader>
        <div>
          <p className="eyebrow">SEARCH RESULTS</p>
          <h2>Results for “{query}”</h2>
        </div>
        <ResultsSummary>
          {visibleResults.length} of {results.length}
        </ResultsSummary>
      </ResultsHeader>
      <ResultsGrid>
        {visibleResults.map((item) => (
          <ResultCard key={item.id} item={item} />
        ))}
      </ResultsGrid>
      {hasMore && (
        <>
          <Sentinel ref={sentinelRef} aria-hidden="true" />
          <div className="load-more-wrap">
            <LoadMoreButton
              type="button"
              onClick={() => dispatch(showNextPage())}
            >
              Load 10 more
            </LoadMoreButton>
          </div>
        </>
      )}
    </ResultsSection>
  );
}
