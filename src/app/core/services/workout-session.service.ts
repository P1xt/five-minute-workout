import { Injectable } from "@angular/core";
import { WorkoutOption } from "@app/core/models/workout.model";

@Injectable({ providedIn: "root" })
export class WorkoutSessionService {
  private options: WorkoutOption[] = [];

  setOptions(options: WorkoutOption[]): void {
    this.options = options;
  }

  getOptions(): WorkoutOption[] {
    return this.options;
  }
}
