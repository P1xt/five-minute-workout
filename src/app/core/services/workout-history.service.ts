import { Injectable, inject } from "@angular/core";
import { WorkoutCompletion } from "@app/core/models/user-data.model";
import { WorkoutOption } from "@app/core/models/workout.model";
import { StorageService } from "./storage.service";

@Injectable({ providedIn: "root" })
export class WorkoutHistoryService {
  private readonly storage = inject(StorageService);

  async complete(workout: WorkoutOption, notes: string): Promise<void> {
    const completion: WorkoutCompletion = {
      id: crypto.randomUUID(),
      workoutKey: workout.workoutKey,
      planId: workout.planId,
      workoutId: workout.id,
      title: workout.title,
      category: workout.category,
      completedAt: new Date().toISOString(),
      notes,
    };
    await this.storage.saveCompletion(completion);
  }

  history(): Promise<WorkoutCompletion[]> {
    return this.storage.getHistory();
  }

  async lastForWorkout(
    workoutKey: string,
  ): Promise<WorkoutCompletion | undefined> {
    const history = await this.history();
    return history.filter((entry) => entry.workoutKey === workoutKey).at(-1);
  }
}
