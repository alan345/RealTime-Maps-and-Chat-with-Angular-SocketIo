import { Routes, RouterModule } from '@angular/router';
import { NgModule }            from '@angular/core';
import { MissionComponent} from './single/mission.component';
import { MissionContentComponent} from './single/missionContent.component';
import { MissionsComponent} from './list/missions.component';
// import {ProjectMissionsComponent} from './project/projectMissions.component';
export const routes: Routes = [
  {path: '', component: MissionsComponent},
  // {path: 'project/:idProject', component: ProjectMissionsComponent},
  // {path: 'project', component: ProjectMissionsComponent},
  // {path: 'missionSingle', component: MissionSingleComponent},
  // {path: 'missionSingle/:id', component: MissionSingleComponent},
  // {path: 'new', component: MissionComponent},
  // {path: 'new/:idClient', component: MissionSingleComponent},
  {path: ':id', component: MissionContentComponent},



  // {path: 'missions/:id', component: MissionsComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MissionRouting {}
