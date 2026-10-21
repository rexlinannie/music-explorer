import { useAppSelector } from "./app/hooks";
import { SearchForm } from "./components/SearchForm/SearchForm";
import { SearchResults } from "./components/SearchResults/SearchResults";
import {
  AppShell,
  Brand,
  Header,
  HeaderNote,
  Content,
} from "./styles/App.styles";

export default function App() {
  const { status, error } = useAppSelector((state) => state.search);
  return (
    <AppShell>
      <Header>
        <Brand>
          <span className="brand-mark" aria-hidden="true">
            ♫
          </span>
          <span>Music Explorer</span>
        </Brand>
        <HeaderNote>A little closer to the music</HeaderNote>
      </Header>
      <Content>
        <h2>Enjoy listening to your favourite music</h2>
        <p>Search artists, albums and songs in one place.</p>
        <SearchForm />
        {status === "loading" && (
          <p role="status" className="status-message">
            Searching the music library…
          </p>
        )}
        {status === "failed" && (
          <p role="alert" className="error-message">
            {error}
          </p>
        )}
        <SearchResults />
      </Content>
      <footer>Music Explorer · Powered by the Apple iTunes Search API</footer>
    </AppShell>
  );
}
