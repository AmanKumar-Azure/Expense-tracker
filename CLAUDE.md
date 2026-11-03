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

`App` (`src/App.jsx`) owns the `transactions` array and the `categories` list and passes them down to four child components, each in its own file in `src/`:

- `Summary` has no state; it derives the income, expense, and balance totals from all transactions, so filters don't affect them.
- `SpendingChart` has no state; it totals expenses per category from all transactions and renders a horizontal Recharts bar chart (`layout="vertical"`), sorted largest first.
- `TransactionForm` owns the form fields, builds new transactions, and passes them up through `onAdd`.
- `TransactionList` owns the filter state and the pending-delete state, renders the filtered table, and requests deletions by id through `onDelete` once the user confirms in `ConfirmDialog`.

`App` lays these out as a navy header containing `Summary`, then a two-column workspace: form and transaction table on the left, `SpendingChart` in a sticky sidebar on the right. Below 900px it collapses to one column.

`src/format.js` holds the shared display formatters (`formatMoney`, `formatMoneyWhole`, `formatCategory`, `formatDate`). Use them instead of formatting amounts, categories, or dates inline.

`ConfirmDialog` (`src/ConfirmDialog.jsx`) is a reusable modal built on the native `<dialog>` element. `TransactionList` renders it only while a delete is pending.

State is in-memory only, seeded from a hardcoded array, so changes are lost on reload.

Styling is plain CSS: global styles and the color/font tokens (CSS custom properties) live in `src/index.css`, and styles for all components live in `src/App.css`, which only `App` imports. The IBM Plex Sans fonts load from Google Fonts in `index.html`. `SpendingChart` repeats a few of the hex colors because Recharts takes colors as props.

Transaction `amount` values are numbers. The form's `amount` state is a string, and `TransactionForm` converts it when creating a transaction.

## Known issues

- `TransactionForm` dates new transactions with `toISOString()`, which is UTC, so the date can be a day off from the user's local date.
