import { configureStore } from "@reduxjs/toolkit";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { ThemeProvider } from "styled-components";
import App from "../App";
import searchReducer from "../features/search/searchSlice";
import { theme } from "../styles/theme";

function renderApp() {
  const store = configureStore({ reducer: { search: searchReducer } });
  return render(
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </Provider>,
  );
}

describe("Music Explorer", () => {
  it("shows the initial prompt and search form", () => {
    renderApp();
    expect(
      screen.getByRole("heading", { name: /your soundtrack starts here/i }),
    ).toBeInTheDocument();
    expect(screen.getByRole("search")).toBeInTheDocument();
  });
});
