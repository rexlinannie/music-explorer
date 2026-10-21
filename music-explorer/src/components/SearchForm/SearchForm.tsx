import { useState, type FormEvent } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { searchMusic } from "../../features/search/searchSlice";
import {
  SearchButton,
  SearchField,
  SearchFormElement,
  SearchIcon,
  SearchInput,
  SearchLabel,
} from "../../styles/SearchForm.styles";

export function SearchForm() {
  const [query, setQuery] = useState("");
  const dispatch = useAppDispatch();
  const status = useAppSelector((state) => state.search.status);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const term = query.trim();
    if (term) dispatch(searchMusic(term));
  };

  return (
    <SearchFormElement onSubmit={handleSubmit} role="search">
      <SearchLabel htmlFor="music-search">Search music</SearchLabel>
      <SearchField>
        <SearchIcon aria-hidden="true">⌕</SearchIcon>
        <SearchInput
          id="music-search"
          name="query"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Try an artist, album or song…"
          autoComplete="off"
          maxLength={100}
        />
        <SearchButton
          type="submit"
          disabled={!query.trim() || status === "loading"}
        >
          {status === "loading" ? "Searching…" : "Search"}
        </SearchButton>
      </SearchField>
    </SearchFormElement>
  );
}
