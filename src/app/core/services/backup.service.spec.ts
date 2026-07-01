import { describe, expect, it } from "vitest";
import { BackupService } from "./backup.service";

describe("BackupService", () => {
  it("validates and normalizes a v1 backup file", () => {
    const service = new BackupService({} as never);
    const backup = service.validate({
      app: "five-minute-workout",
      schemaVersion: 1,
      exportedAt: "2026-06-30T00:00:00.000Z",
      data: {
        settings: {
          themeMode: "dark",
          accentColor: "cyan",
          selectedPlanIds: ["a"],
        },
      },
    });

    expect(backup.data.settings.selectedPlanIds).toEqual(["a"]);
    expect(backup.data.workoutNotes).toEqual([]);
    expect(backup.data.workoutHistory).toEqual([]);
  });

  it("rejects unrelated files", () => {
    const service = new BackupService({} as never);
    expect(() => service.validate({ app: "something-else" })).toThrow(
      /valid Five-Minute Workout/,
    );
  });
});
