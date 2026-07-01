import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RouterModule, Routes } from "@angular/router";
import { SettingsComponent } from "./settings.component";

const routes: Routes = [{ path: "", component: SettingsComponent }];

@NgModule({
  imports: [
    SettingsComponent,
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes),
  ],
})
export class SettingsModule {}
