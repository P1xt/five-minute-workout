import { Injectable, inject } from "@angular/core";
import { StorageService } from "./storage.service";

@Injectable({ providedIn: "root" })
export class WorkoutNotesService {
  private readonly storage = inject(StorageService);

  async getNote(workoutKey: string): Promise<string> {
    return (await this.storage.getNote(workoutKey))?.note ?? "";
  }

  async saveNote(workoutKey: string, note: string): Promise<void> {
    await this.storage.saveNote({
      workoutKey,
      note,
      updatedAt: new Date().toISOString(),
    });
  }
}
