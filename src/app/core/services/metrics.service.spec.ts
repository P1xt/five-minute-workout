import { describe, expect, it } from "vitest";
import { WorkoutCompletion } from "@app/core/models/user-data.model";
import { MetricsService } from "./metrics.service";

const entry = (
  completedAt: string,
  category = "Mobility",
): WorkoutCompletion => ({
  id: completedAt + category,
  workoutKey: "plan:1",
  planId: "plan",
  workoutId: 1,
  title: "Workout",
  category,
  completedAt,
  notes: "",
});

describe("MetricsService", () => {
  it("calculates day, week, month, total, and category trends", () => {
    const service = new MetricsService({ history: async () => [] } as never);
    const summary = service.calculate(
      [
        entry("2026-06-30T12:00:00.000Z", "Strength"),
        entry("2026-06-29T12:00:00.000Z", "Strength"),
        entry("2026-06-01T12:00:00.000Z", "Mobility"),
      ],
      new Date("2026-06-30T20:00:00.000Z"),
    );

    expect(summary.today).toBe(1);
    expect(summary.week).toBe(2);
    expect(summary.month).toBe(3);
    expect(summary.total).toBe(3);
    expect(summary.categoryTrends[0]).toEqual({
      category: "Strength",
      count: 2,
    });
  });
});
