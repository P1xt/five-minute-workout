import { Component, OnInit, inject } from "@angular/core";
import { Router } from "@angular/router";
import { WorkoutPlan } from "@app/core/models/workout.model";
import { SettingsService } from "@app/core/services/settings.service";
import { WorkoutCatalogService } from "@app/core/services/workout-catalog.service";

@Component({
  standalone: true,
  selector: "fmw-plan-selection",
  templateUrl: "./plan-selection.component.html",
})
export class PlanSelectionComponent implements OnInit {
  private readonly catalog = inject(WorkoutCatalogService);
  private readonly settings = inject(SettingsService);
  private readonly router = inject(Router);

  plans: WorkoutPlan[] = [];
  selected = new Set<string>();
  loading = true;

  async ngOnInit(): Promise<void> {
    const [plans, settings] = await Promise.all([
      this.catalog.getPlans(),
      this.settings.load(),
    ]);
    this.plans = plans;
    this.selected = new Set(settings.selectedPlanIds);
    this.loading = false;
  }

  isSelected(planId: string): boolean {
    return this.selected.has(planId);
  }

  toggle(planId: string): void {
    if (this.selected.has(planId)) {
      this.selected.delete(planId);
    } else {
      this.selected.add(planId);
    }
    this.settings.setSelectedPlanIds([...this.selected])
  }

  async continue(): Promise<void> {
    await this.settings.setSelectedPlanIds([...this.selected]);
    await this.router.navigateByUrl("/randomizer");
  }
}
