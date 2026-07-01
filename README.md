# Five-Minute Workout

An Angular progressive web app for local-only five-minute workout selection, notes, history, metrics, and backup import/export.

## Privacy and storage

This app has no backend, no accounts, and no server-side data storage. Workout notes, completion history, selected plans, and settings are stored locally in IndexedDB on the user's device/browser profile. Backup export creates a JSON file on the user's device; import reads a user-selected JSON backup file.

## Features

- Select one or more workout plans from `workout_plans_updated.json`
- Randomize three workouts from the selected plans
- Complete a selected workout
- Save persistent notes per workout using stable `planId:workoutId` keys
- Track completions by day, week, month, total, and category trend
- Dark theme by default with cyan accent
- Settings for theme/accent, import, export, merge/replace, and clearing local data
- Angular service worker configuration for offline PWA builds
- Vitest unit tests for core service logic
- Playwright end-to-end tests for the main browser flows

## Commands

```bash
npm install
npm start
npm test
npm run e2e
npm run build
```

For installable/offline PWA behavior, run a production build and serve the built output over HTTP.
