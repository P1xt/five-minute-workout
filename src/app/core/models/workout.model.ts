export interface Exercise {
  name: string;
  target: string;
  instruction: string;
}

export interface Workout {
  id: number | string;
  title: string;
  category: string;
  description: string;
  exercises: Exercise[];
}

export interface WorkoutPlan {
  id: string;
  name: string;
  description: string;
  workouts: Workout[];
}

export interface WorkoutCatalog {
  workoutPlans: WorkoutPlan[];
}

export interface WorkoutOption extends Workout {
  planId: string;
  planName: string;
  workoutKey: string;
}

export const workoutKey = (
  planId: string,
  workoutId: number | string,
): string => planId + ":" + workoutId;
