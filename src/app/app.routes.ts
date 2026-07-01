import { Routes } from "@angular/router";

export const routes: Routes = [
  { path: "", pathMatch: "full", redirectTo: "plans" },
  {
    path: "plans",
    loadChildren: () =>
      import("./features/plan-selection/plan-selection.module").then(
        (m) => m.PlanSelectionModule,
      ),
  },
  {
    path: "randomizer",
    loadChildren: () =>
      import("./features/randomizer/randomizer.module").then(
        (m) => m.RandomizerModule,
      ),
  },
  {
    path: "workout/:workoutKey",
    loadChildren: () =>
      import("./features/workout-session/workout-session.module").then(
        (m) => m.WorkoutSessionModule,
      ),
  },
  {
    path: "metrics",
    loadChildren: () =>
      import("./features/metrics/metrics.module").then((m) => m.MetricsModule),
  },
  {
    path: "settings",
    loadChildren: () =>
      import("./features/settings/settings.module").then(
        (m) => m.SettingsModule,
      ),
  },
  { path: "**", redirectTo: "plans" },
];
