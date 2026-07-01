import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { MetricsComponent } from "./metrics.component";

const routes: Routes = [{ path: "", component: MetricsComponent }];

@NgModule({
  imports: [MetricsComponent, CommonModule, RouterModule.forChild(routes)],
})
export class MetricsModule {}
