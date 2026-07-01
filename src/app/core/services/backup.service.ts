import { Injectable, inject } from "@angular/core";
import { BackupFile, defaultSettings } from "@app/core/models/user-data.model";
import { StorageService } from "./storage.service";

@Injectable({ providedIn: "root" })
export class BackupService {
  private readonly storage = inject(StorageService);

  async buildBackup(): Promise<BackupFile> {
    return {
      app: "five-minute-workout",
      schemaVersion: 1,
      exportedAt: new Date().toISOString(),
      data: {
        settings: await this.storage.getSettings(),
        workoutNotes: await this.storage.getAllNotes(),
        workoutHistory: await this.storage.getHistory(),
      },
    };
  }

  async exportBackup(): Promise<void> {
    const backup = await this.buildBackup();
    const blob = new Blob([JSON.stringify(backup, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download =
      "five-minute-workout-backup-" +
      new Date().toISOString().slice(0, 10) +
      ".json";
    link.click();
    URL.revokeObjectURL(url);
  }

  async importBackup(file: File, mode: "merge" | "replace"): Promise<void> {
    const backup = this.validate(JSON.parse(await file.text()));
    if (mode === "replace") {
      await this.storage.replaceAll(
        backup.data.settings,
        backup.data.workoutNotes,
        backup.data.workoutHistory,
      );
    } else {
      await this.storage.mergeAll(
        backup.data.settings,
        backup.data.workoutNotes,
        backup.data.workoutHistory,
      );
    }
  }

  validate(value: unknown): BackupFile {
    const backup = value as BackupFile;
    if (
      backup?.app !== "five-minute-workout" ||
      backup.schemaVersion !== 1 ||
      !backup.data
    ) {
      throw new Error("This is not a valid Five-Minute Workout backup.");
    }
    return {
      ...backup,
      data: {
        settings: { ...defaultSettings, ...backup.data.settings },
        workoutNotes: backup.data.workoutNotes ?? [],
        workoutHistory: backup.data.workoutHistory ?? [],
      },
    };
  }
}
