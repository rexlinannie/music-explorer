import styled from "styled-components";
export const AppShell = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  footer {
    margin-top: auto;
    padding: 30px 20px;
    color: ${({ theme }) => theme.colors.muted};
    font-size: 0.78rem;
    text-align: center;
  }
  .status-message,
  .error-message {
    padding: 12px 14px;
    border-radius: 10px;
    font-size: 0.9rem;
  }
  .status-message {
    color: ${({ theme }) => theme.colors.muted};
    background: ${({ theme }) => theme.colors.surface};
  }
  .error-message {
    color: #ffb4b4;
    background: rgba(255, 90, 90, 0.1);
  }
`;
export const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: min(100% - 40px, 1120px);
  margin: 0 auto;
  padding: 25px 0;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  @media (max-width: 480px) {
    width: min(100% - 28px, 1120px);
  }
`;
export const Brand = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 10px;
  color: ${({ theme }) => theme.colors.text};
  font-size: 2rem;
  font-weight: 800;
  .brand-mark {
    display: grid;
    place-items: center;
    width: 34px;
    height: 34px;
    border-radius: 11px;
    color: #101014;
    background: ${({ theme }) => theme.colors.accent};
    font-size: 1.35rem;
  }
`;
export const HeaderNote = styled.span`
  color: ${({ theme }) => theme.colors.muted};
  font-size: 0.82rem;
  @media (max-width: 520px) {
    display: none;
  }
`;
export const Content = styled.main`
  width: min(100% - 40px, 960px);
  margin: 0 auto;
  padding: 32px 0 32px;
  flex: 1;
  @media (max-width: 480px) {
    width: min(100% - 28px, 960px);
    padding-top: 32px;
  }
`;
