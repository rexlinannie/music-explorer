import styled from "styled-components";
export const ResultsSection = styled.section`
  margin-top: 18px;
  .load-more-wrap {
    display: flex;
    justify-content: center;
    padding: 16px 0 28px;
  }
`;
export const ResultsHeader = styled.div`
  display: flex;
  align-items: end;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 18px;
  .eyebrow {
    margin: 0 0 7px;
    color: ${({ theme }) => theme.colors.accent};
    font-size: 0.7rem;
    font-weight: 800;
    letter-spacing: 0.13em;
  }
  h2 {
    margin: 0;
    font-size: clamp(1.2rem, 3vw, 1.55rem);
  }
`;
export const ResultsSummary = styled.span`
  flex-shrink: 0;
  color: ${({ theme }) => theme.colors.muted};
  font-size: 0.82rem;
`;
export const ResultsGrid = styled.ul`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 12px;
  margin: 0;
  padding: 0;
  list-style: none;
  @media (max-width: 700px) {
    grid-template-columns: 1fr;
  }
`;
export const Sentinel = styled.div`
  width: 100%;
  height: 1px;
`;
export const LoadMoreButton = styled.button`
  border: 1px solid ${({ theme }) => theme.colors.borderHover};
  border-radius: 999px;
  padding: 11px 20px;
  color: ${({ theme }) => theme.colors.text};
  background: ${({ theme }) => theme.colors.surface};
  font: inherit;
  font-size: 0.88rem;
  font-weight: 600;
  cursor: pointer;
  &:hover {
    border-color: ${({ theme }) => theme.colors.accent};
  }
  &:focus-visible {
    outline: 3px solid ${({ theme }) => theme.colors.accent};
    outline-offset: 3px;
  }
`;
export const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 52px 20px 64px;
  text-align: center;
  h2 {
    margin: 15px 0 8px;
    font-size: 1.25rem;
  }
`;
export const EmptyIcon = styled.div`
  display: grid;
  place-items: center;
  width: 64px;
  height: 64px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 20px;
  color: ${({ theme }) => theme.colors.accent};
  background: ${({ theme }) => theme.colors.surface};
  font-size: 2rem;
`;
export const EmptyDescription = styled.p`
  max-width: 420px;
  margin: 0;
  color: ${({ theme }) => theme.colors.muted};
  line-height: 1.65;
`;
