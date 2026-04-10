Decision 1 — Central Axios Client with Interceptors
What:
A single Axios instance in src/api/client.ts handles all API communication. Every request goes through this client — no direct Axios imports anywhere else in the codebase.
Context:
 Letting each hook manage its own Axios call directly will create problems quickly — the auth token would need to be attached manually on every call, error handling would be inconsistent across hooks, and retry logic would need to be duplicated. Centralising everything in one client means these concerns are handled once.
Prompt strategy:
Directed Cursor to build the client with three specific requirements in one prompt — request interceptor for the Bearer token, response interceptor for normalised error shapes, and retry logic for network errors only. Cursor added ApiNormalizedError as a typed interface for error rejections which was a good addition — kept the error shape typed without using any. No significant corrections needed on the first attempt.
Trade-offs:
All API errors are now normalised into { message, status } which makes error handling predictable but loses some of the raw TMDB error detail. Acceptable trade-off for consistency across the app.

Decision 2 — Folder Structure and Screen-Level Hook Pattern
What:
All source code follows a strict folder structure under src/. Every screen fetches data exclusively through a custom hook — no inline useEffect + fetch inside screen components. Screens are UI only.
Context:
React Native CLI generates a very bare project structure by default — just App.tsx and index.js. Without explicit scaffolding, Cursor would have created files wherever it saw fit and inline data fetching would have crept into screen components naturally. The hook pattern was prescribed by the assignment but enforcing it required explicit rules.
Prompt strategy:
Directed Cursor to create the full folder structure in one prompt with empty files only — no code yet. Cursor tried to create .cursor/rules inside the React Native project folder instead of the outer repo root and failed due to write permissions. Fixed by running a new prompt again to add rules in the existing rules file. The folder structure itself was created correctly on the first attempt. Rules were then added to .cursor/rules to enforce the hook pattern on every future prompt.
Trade-offs:
The strict hook pattern adds a layer of indirection — a screen can't just fetch data inline, it always needs a dedicated hook file. This is more verbose for simple screens but pays off on complex screens like Detail where three parallel API calls need independent loading and error states.