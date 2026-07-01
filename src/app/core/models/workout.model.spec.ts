import { describe, expect, it } from "vitest";
import { workoutKey } from "./workout.model";

describe("workoutKey", () => {
  it("combines plan and local workout id to avoid collisions", () => {
    expect(workoutKey("plan-a", 1)).toBe("plan-a:1");
  });
});
