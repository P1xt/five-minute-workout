import { describe, expect, it } from "vitest";
import { WorkoutOption } from "@app/core/models/workout.model";
import { WorkoutRandomizerService } from "./workout-randomizer.service";

const workout = (id: number): WorkoutOption => ({
  id,
  title: "Workout " + id,
  category: "Strength",
  description: "Five minutes",
  exercises: [],
  planId: "plan",
  planName: "Plan",
  workoutKey: "plan:" + id,
});

describe("WorkoutRandomizerService", () => {
  it("returns exactly three workouts when the pool has at least three", () => {
    const service = new WorkoutRandomizerService();
    const result = service.pickThree([1, 2, 3, 4].map(workout), () => 0.5);
    expect(result).toHaveLength(3);
  });

  it("returns the available workouts when the pool has fewer than three", () => {
    const service = new WorkoutRandomizerService();
    expect(service.pickThree([workout(1), workout(2)])).toHaveLength(2);
  });
});
