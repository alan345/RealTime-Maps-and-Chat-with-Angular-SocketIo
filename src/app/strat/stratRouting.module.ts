import { Routes, RouterModule } from '@angular/router';
import { NgModule }            from '@angular/core';
import { StratComponent} from './single/strat.component';
import { StratContentComponent} from './single/stratContent.component';
import { StratsComponent} from './list/strats.component';
// import {ProjectStratsComponent} from './project/projectStrats.component';
export const routes: Routes = [
  {path: '', component: StratsComponent},
  // {path: 'project/:idProject', component: ProjectStratsComponent},
  // {path: 'project', component: ProjectStratsComponent},
  // {path: 'stratSingle', component: StratSingleComponent},
  // {path: 'stratSingle/:id', component: StratSingleComponent},
  // {path: 'new', component: StratComponent},
  // {path: 'new/:idClient', component: StratSingleComponent},
  {path: ':id', component: StratContentComponent},



  // {path: 'strats/:id', component: StratsComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StratRouting {}
