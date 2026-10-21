# Music Explorer

React + TypeScript music search using Redux Toolkit (Redux with thunk middleware), Styled Components, and a Node.js/Express proxy for Apple's iTunes Search API.

## Features
- Search artists, albums and songs.
- Express proxy avoids browser CORS restrictions.
- Loading, empty and error states.
- Shows 10 results initially; scrolling reveals another 10.
- Accessible “Load 10 more” fallback.
- Redux async thunk, Jest and React Testing Library tests.
- Each UI component has a separate Styled Components stylesheet.

## Requirements
Node.js 20+ and pnpm.

## Run
```bash
pnpm install
pnpm dev
```
Open the Vite URL printed in the terminal (normally http://localhost:5173). Vite proxies `/api` to Express on port 3001.

## Verify and production
```bash
pnpm test
pnpm typecheck
pnpm build
pnpm start
```
`pnpm start` serves the built app and API from Express on http://localhost:3001. Run `pnpm build` first.

## Design notes
The server requests up to 50 results per Apple entity, normalises and merges them, and the client displays them in batches of 10. This is client-side pagination: scrolling does not make another Apple request. The approach is suitable for this bounded assignment; very large result sets would benefit from server-side pagination where supported. For production, consider rate limiting, caching, API timeouts and monitoring.
