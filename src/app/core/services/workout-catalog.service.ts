import { LocationStrategy } from "@angular/common";
import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { firstValueFrom } from "rxjs";
import {
  WorkoutCatalog,
  WorkoutOption,
  WorkoutPlan,
  workoutKey,
} from "@app/core/models/workout.model";

@Injectable({ providedIn: "root" })
export class WorkoutCatalogService {
  private readonly http = inject(HttpClient);
  private readonly locationStrategy = inject(LocationStrategy);

  private catalogPromise?: Promise<WorkoutCatalog>;

  getPlans(): Promise<WorkoutPlan[]> {
    return this.load().then((catalog) => catalog.workoutPlans);
  }

  async getWorkoutsForPlans(planIds: string[]): Promise<WorkoutOption[]> {
    const plans = await this.getPlans();
    return plans
      .filter((plan) => planIds.includes(plan.id))
      .flatMap((plan) =>
        plan.workouts.map((workout) => ({
          ...workout,
          planId: plan.id,
          planName: plan.name,
          workoutKey: workoutKey(plan.id, workout.id),
        })),
      );
  }

  async findWorkout(key: string): Promise<WorkoutOption | undefined> {
    const plans = await this.getPlans();
    for (const plan of plans) {
      const workout = plan.workouts.find(
        (item) => workoutKey(plan.id, item.id) === key,
      );
      if (workout)
        return {
          ...workout,
          planId: plan.id,
          planName: plan.name,
          workoutKey: key,
        };
    }
    return undefined;
  }

  private load(): Promise<WorkoutCatalog> {
    // Dynamically prepare the asset path based on the application's base href
    const baseHref = this.locationStrategy.getBaseHref();
    const safeBase = baseHref.endsWith("/") ? baseHref : `${baseHref}/`;
    const fullPath = `${safeBase}assets/workout_plans_updated.json`.replace(/([^:]\/)\/+/g, "$1");

    this.catalogPromise ??= firstValueFrom(
      this.http.get<WorkoutCatalog>(fullPath),
    );
    return this.catalogPromise;
  }
}
