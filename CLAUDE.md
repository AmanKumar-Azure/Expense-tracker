# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Starter project for a Claude Code course: a React expense tracker that intentionally has a bug, poor UI, and messy code, all meant to be fixed over the course. Expect rough code; don't assume an odd pattern is deliberate.

## Commands

```bash
npm install       # install dependencies
npm run dev       # Vite dev server at http://localhost:5173
npm run build     # production build to dist/
npm run preview   # serve the production build
npm run lint      # ESLint
```

There is no test runner or test suite configured.

## Architecture

React 19 + Vite, plain JavaScript (JSX), no router, state library, or backend.

All application logic and UI live in the single `App` component in `src/App.jsx`: transaction list, form fields, filters, and the derived totals and filtered list, which are recalculated on each render. State is in-memory only, seeded from a hardcoded array, so changes are lost on reload.

Styling is plain CSS: global styles in `src/index.css`, component styles in `src/App.css`.

Transaction `amount` values are numbers. The form's `amount` state is a string, and `handleSubmit` converts it when creating a transaction.
