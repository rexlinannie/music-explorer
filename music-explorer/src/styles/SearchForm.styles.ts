import styled from "styled-components";

export const SearchFormElement = styled.form`
  width: 100%;
  margin: 30px 0 36px;
`;
export const SearchLabel = styled.label`
  display: block;
  margin-bottom: 10px;
  color: ${({ theme }) => theme.colors.muted};
  font-size: 0.88rem;
  font-weight: 600;
`;
export const SearchField = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 8px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 18px;
  background: ${({ theme }) => theme.colors.surface};
  box-shadow: 0 12px 36px rgba(0, 0, 0, 0.18);
  &:focus-within {
    border-color: ${({ theme }) => theme.colors.accent};
    outline: 3px solid ${({ theme }) => theme.colors.accentSoft};
  }
  @media (max-width: 520px) {
    flex-wrap: wrap;
  }
`;
export const SearchIcon = styled.span`
  padding-left: 10px;
  color: ${({ theme }) => theme.colors.muted};
  font-size: 1.8rem;
  line-height: 1;
`;
export const SearchInput = styled.input`
  min-width: 0;
  flex: 1;
  border: 0;
  outline: 0;
  background: transparent;
  color: ${({ theme }) => theme.colors.text};
  font: inherit;
  padding: 12px 0;
  &::placeholder {
    color: ${({ theme }) => theme.colors.muted};
  }
`;
export const SearchButton = styled.button`
  border: 0;
  border-radius: 12px;
  padding: 13px 20px;
  color: #101014;
  background: ${({ theme }) => theme.colors.accent};
  font: inherit;
  font-weight: 700;
  cursor: pointer;
  transition:
    transform 120ms ease,
    opacity 120ms ease;
  &:hover:not(:disabled) {
    transform: translateY(-1px);
  }
  &:disabled {
    cursor: not-allowed;
    opacity: 0.55;
  }
  &:focus-visible {
    outline: 3px solid ${({ theme }) => theme.colors.accent};
    outline-offset: 3px;
  }
`;
