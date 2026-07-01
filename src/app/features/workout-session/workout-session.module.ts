import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RouterModule, Routes } from "@angular/router";
import { WorkoutSessionComponent } from "./workout-session.component";
import { TimerComponent } from "./timer/timer.component";

const routes: Routes = [{ path: "", component: WorkoutSessionComponent }];

@NgModule({
  declarations: [],
  imports: [
    WorkoutSessionComponent,
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes),
    TimerComponent,
  ],
})
export class WorkoutSessionModule {}
