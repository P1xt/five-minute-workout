import { Component, OnInit, inject } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { WorkoutCompletion } from "@app/core/models/user-data.model";
import { WorkoutOption } from "@app/core/models/workout.model";
import { WorkoutCatalogService } from "@app/core/services/workout-catalog.service";
import { WorkoutHistoryService } from "@app/core/services/workout-history.service";
import { WorkoutNotesService } from "@app/core/services/workout-notes.service";
import { TimerComponent } from "./timer/timer.component";
import { DatePipe } from "@angular/common";
import { FormsModule } from "@angular/forms";

@Component({
  standalone: true,
  selector: "fmw-workout-session",
  templateUrl: "./workout-session.component.html",
  imports: [TimerComponent, DatePipe, FormsModule],
})
export class WorkoutSessionComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly catalog = inject(WorkoutCatalogService);
  private readonly notesService = inject(WorkoutNotesService);
  private readonly history = inject(WorkoutHistoryService);

  workout?: WorkoutOption;
  notes = "";
  lastCompletion?: WorkoutCompletion;
  saving = false;

  async ngOnInit(): Promise<void> {
    const key = decodeURIComponent(
      this.route.snapshot.paramMap.get("workoutKey") ?? "",
    );
    this.workout = await this.catalog.findWorkout(key);
    if (!this.workout) return;
    const [notes, lastCompletion] = await Promise.all([
      this.notesService.getNote(this.workout.workoutKey),
      this.history.lastForWorkout(this.workout.workoutKey),
    ]);
    this.notes = notes || lastCompletion?.notes || "";
    this.lastCompletion = lastCompletion;
  }

  async saveNotes(): Promise<void> {
    if (!this.workout) return;
    await this.notesService.saveNote(this.workout.workoutKey, this.notes);
  }

  async complete(): Promise<void> {
    if (!this.workout) return;
    this.saving = true;
    await this.saveNotes();
    await this.history.complete(this.workout, this.notes);
    await this.router.navigateByUrl("/metrics");
  }
}
