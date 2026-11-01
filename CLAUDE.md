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

`App` (`src/App.jsx`) owns the `transactions` array and the `categories` list and passes them down to three child components, each in its own file in `src/`:

- `Summary` has no state; it derives the income, expense, and balance totals from all transactions, so filters don't affect them.
- `TransactionForm` owns the form fields, builds new transactions, and passes them up through `onAdd`.
- `TransactionList` owns the filter state and renders the filtered table.

State is in-memory only, seeded from a hardcoded array, so changes are lost on reload.

Styling is plain CSS: global styles in `src/index.css`, and styles for all components in `src/App.css`, which only `App` imports.

Transaction `amount` values are numbers. The form's `amount` state is a string, and `TransactionForm` converts it when creating a transaction.

## Known issues

- `TransactionForm` dates new transactions with `toISOString()`, which is UTC, so the date can be a day off from the user's local date.
