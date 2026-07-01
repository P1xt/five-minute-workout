# Five-Minute Workout

An Angular progressive web app for local-only five-minute workout selection, notes, history, metrics, and backup import/export.

The main goal is an app that can sit on your desktop and, with the press of a button, suggest a 5 minute workout suitable to get you up from your desk for a bit of movement.

[A live demo may be found here!](https://p1xt.github.io/five-minute-workout/plans)

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

## Development

This is an Angular PWA vibe coded with Codex. Well, most of it is, after Codex was done, I went in added linting and prettier and tweaked some style changes I still wanted when I ran out of Codex credits.

The plans and workouts this app relies on were brainstormed with ChatGPT for a few limited equipment scenarios (and one professional office scenario so there would be a no-equipment option that wouldn't suggest you get down on the floor and do pelvic thrusts or anything else that might land you in HR if a passing co-worker saw it.)

## Future
- maybe add a backend and some social connection like a friends leaderboard for completed sessions
- add some additional themes
- add an admin feature for customizing the plans and workouts 
