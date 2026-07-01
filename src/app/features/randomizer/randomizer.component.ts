import { Component, OnInit, inject } from "@angular/core";
import { Router } from "@angular/router";
import { WorkoutOption } from "@app/core/models/workout.model";
import { SettingsService } from "@app/core/services/settings.service";
import { WorkoutCatalogService } from "@app/core/services/workout-catalog.service";
import { WorkoutRandomizerService } from "@app/core/services/workout-randomizer.service";
import { WorkoutSessionService } from "@app/core/services/workout-session.service";

@Component({
  standalone: true,
  selector: "fmw-randomizer",
  templateUrl: "./randomizer.component.html",
})
export class RandomizerComponent implements OnInit {
  private readonly settings = inject(SettingsService);
  private readonly catalog = inject(WorkoutCatalogService);
  private readonly randomizer = inject(WorkoutRandomizerService);
  private readonly session = inject(WorkoutSessionService);
  private readonly router = inject(Router);

  options: WorkoutOption[] = [];
  selectedPlanCount = 0;
  loading = true;

  async ngOnInit(): Promise<void> {
    await this.randomize();
  }

  async randomize(): Promise<void> {
    this.loading = true;
    const settings = await this.settings.load();
    this.selectedPlanCount = settings.selectedPlanIds.length;
    const pool = await this.catalog.getWorkoutsForPlans(
      settings.selectedPlanIds,
    );
    this.options = this.randomizer.pickThree(pool);
    this.session.setOptions(this.options);
    this.loading = false;
  }

  async choose(workout: WorkoutOption): Promise<void> {
    await this.router.navigate([
      "/workout",
      encodeURIComponent(workout.workoutKey),
    ]);
  }
}
