import { Injectable } from "@angular/core";
import { WorkoutOption } from "@app/core/models/workout.model";

@Injectable({ providedIn: "root" })
export class WorkoutRandomizerService {
  pickThree(pool: WorkoutOption[], random = Math.random): WorkoutOption[] {
    return [...pool]
      .map((workout) => ({ workout, rank: random() }))
      .sort((a, b) => a.rank - b.rank)
      .slice(0, Math.min(3, pool.length))
      .map((item) => item.workout);
  }
}
