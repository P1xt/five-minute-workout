import { Injectable } from "@angular/core";
import { DBSchema, IDBPDatabase, openDB } from "idb";
import {
  AppSettings,
  WorkoutCompletion,
  WorkoutNote,
  defaultSettings,
} from "@app/core/models/user-data.model";

interface WorkoutDb extends DBSchema {
  settings: { key: string; value: AppSettings };
  notes: { key: string; value: WorkoutNote };
  history: {
    key: string;
    value: WorkoutCompletion;
    indexes: { "by-completedAt": string; "by-workoutKey": string };
  };
}

@Injectable({ providedIn: "root" })
export class StorageService {
  private dbPromise?: Promise<IDBPDatabase<WorkoutDb>>;

  private db(): Promise<IDBPDatabase<WorkoutDb>> {
    this.dbPromise ??= openDB<WorkoutDb>("five-minute-workout", 1, {
      upgrade(db) {
        db.createObjectStore("settings");
        db.createObjectStore("notes", { keyPath: "workoutKey" });
        const history = db.createObjectStore("history", { keyPath: "id" });
        history.createIndex("by-completedAt", "completedAt");
        history.createIndex("by-workoutKey", "workoutKey");
      },
    });
    return this.dbPromise;
  }

  async getSettings(): Promise<AppSettings> {
    const stored = await (await this.db()).get("settings", "app");
    return stored ? { ...defaultSettings, ...stored } : defaultSettings;
  }

  async saveSettings(settings: AppSettings): Promise<void> {
    await (await this.db()).put("settings", settings, "app");
  }

  async getNote(workoutKey: string): Promise<WorkoutNote | undefined> {
    return (await this.db()).get("notes", workoutKey);
  }

  async getAllNotes(): Promise<WorkoutNote[]> {
    return (await this.db()).getAll("notes");
  }

  async saveNote(note: WorkoutNote): Promise<void> {
    await (await this.db()).put("notes", note);
  }

  async saveCompletion(completion: WorkoutCompletion): Promise<void> {
    await (await this.db()).put("history", completion);
  }

  async getHistory(): Promise<WorkoutCompletion[]> {
    return (await this.db()).getAllFromIndex("history", "by-completedAt");
  }

  async replaceAll(
    settings: AppSettings,
    notes: WorkoutNote[],
    history: WorkoutCompletion[],
  ): Promise<void> {
    const db = await this.db();
    const tx = db.transaction(["settings", "notes", "history"], "readwrite");
    await Promise.all([
      tx.objectStore("notes").clear(),
      tx.objectStore("history").clear(),
    ]);
    await tx
      .objectStore("settings")
      .put({ ...defaultSettings, ...settings }, "app");
    await Promise.all(notes.map((note) => tx.objectStore("notes").put(note)));
    await Promise.all(
      history.map((entry) => tx.objectStore("history").put(entry)),
    );
    await tx.done;
  }

  async mergeAll(
    settings: AppSettings,
    notes: WorkoutNote[],
    history: WorkoutCompletion[],
  ): Promise<void> {
    const current = await this.getSettings();
    await this.saveSettings({ ...current, ...settings });
    const db = await this.db();
    const tx = db.transaction(["notes", "history"], "readwrite");
    await Promise.all(notes.map((note) => tx.objectStore("notes").put(note)));
    await Promise.all(
      history.map((entry) => tx.objectStore("history").put(entry)),
    );
    await tx.done;
  }

  async clearAll(): Promise<void> {
    await this.replaceAll(defaultSettings, [], []);
  }
}
