export type ThemeMode = "light" | "dark" | "system";
export interface AppSettings {
  selectedPlanIds: string[];
  themeMode: ThemeMode;
}

export interface WorkoutNote {
  workoutKey: string;
  note: string;
  updatedAt: string;
}

export interface WorkoutCompletion {
  id: string;
  workoutKey: string;
  planId: string;
  workoutId: number | string;
  title: string;
  category: string;
  completedAt: string;
  notes: string;
}

export interface BackupFile {
  app: "five-minute-workout";
  schemaVersion: 1;
  exportedAt: string;
  data: {
    settings: AppSettings;
    workoutNotes: WorkoutNote[];
    workoutHistory: WorkoutCompletion[];
  };
}

export const defaultSettings: AppSettings = {
  selectedPlanIds: [],
  themeMode: "dark",
};
