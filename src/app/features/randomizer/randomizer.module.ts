import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { RandomizerComponent } from "./randomizer.component";

const routes: Routes = [{ path: "", component: RandomizerComponent }];

@NgModule({
  declarations: [],
  imports: [RandomizerComponent, CommonModule, RouterModule.forChild(routes)],
})
export class RandomizerModule {}
