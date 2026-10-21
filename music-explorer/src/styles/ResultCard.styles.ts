import styled, { css } from "styled-components";
import type { ResultKind } from "../types/music";

export const Card = styled.li`
  display: flex;
  gap: 15px;
  min-width: 0;
  padding: 15px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 16px;
  background: ${({ theme }) => theme.colors.surface};
  transition:
    border-color 150ms ease,
    transform 150ms ease;
  &:hover {
    border-color: ${({ theme }) => theme.colors.borderHover};
    transform: translateY(-2px);
  }
`;
export const Artwork = styled.img`
  width: 92px;
  height: 92px;
  flex: 0 0 92px;
  border-radius: 10px;
  object-fit: cover;
  background: ${({ theme }) => theme.colors.surfaceRaised};
  @media (max-width: 480px) {
    width: 72px;
    height: 72px;
    flex-basis: 72px;
  }
`;
export const ArtworkFallback = styled.div`
  display: grid;
  place-items: center;
  width: 92px;
  height: 92px;
  flex: 0 0 92px;
  border-radius: 10px;
  color: ${({ theme }) => theme.colors.accent};
  background: ${({ theme }) => theme.colors.surfaceRaised};
  font-size: 2rem;
`;
export const Metadata = styled.div`
  min-width: 0;
  flex: 1;
  p {
    overflow: hidden;
    margin: 5px 0 0;
    color: ${({ theme }) => theme.colors.muted};
    font-size: 0.88rem;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .collection {
    font-size: 0.8rem;
  }
  .year {
    display: inline-block;
    margin-top: 7px;
    color: ${({ theme }) => theme.colors.muted};
    font-size: 0.75rem;
  }
  a {
    display: block;
    width: fit-content;
    margin-top: 9px;
    color: ${({ theme }) => theme.colors.accent};
    font-size: 0.8rem;
    font-weight: 600;
    text-decoration: none;
  }
  a:hover {
    text-decoration: underline;
  }
  a:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.accent};
    outline-offset: 3px;
  }
`;
export const KindLabel = styled.span<{ $kind: ResultKind }>`
  display: inline-flex;
  margin-bottom: 6px;
  border-radius: 6px;
  padding: 4px 7px;
  color: ${({ theme }) => theme.colors.muted};
  background: ${({ theme }) => theme.colors.surfaceRaised};
  font-size: 0.67rem;
  font-weight: 800;
  letter-spacing: 0.07em;
  text-transform: uppercase;
  ${({ $kind, theme }) =>
    $kind === "artist" &&
    css`
      color: ${theme.colors.artist};
    `}
  ${({ $kind, theme }) =>
    $kind === "album" &&
    css`
      color: ${theme.colors.album};
    `}
  ${({ $kind, theme }) =>
    $kind === "song" &&
    css`
      color: ${theme.colors.song};
    `}
`;
export const ResultTitle = styled.h2`
  overflow: hidden;
  margin: 0;
  color: ${({ theme }) => theme.colors.text};
  font-size: 1rem;
  font-weight: 700;
  line-height: 1.35;
  text-overflow: ellipsis;
  white-space: nowrap;
`;
