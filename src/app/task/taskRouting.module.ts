import { Routes, RouterModule } from '@angular/router';
import { NgModule }            from '@angular/core';
import { TaskComponent} from './single/task.component';
import { TasksComponent} from './tasks/tasks.component';
import {ProjectTasksComponent} from './project/projectTasks.component';
export const routes: Routes = [
  {path: '', component: TasksComponent},
  {path: 'project/:idProject', component: ProjectTasksComponent},
  {path: 'project', component: ProjectTasksComponent},
  // {path: 'taskSingle', component: TaskSingleComponent},
  // {path: 'taskSingle/:id', component: TaskSingleComponent},
  {path: 'new', component: TaskComponent},
  // {path: 'new/:idClient', component: TaskSingleComponent},
  {path: ':id', component: TaskComponent},



  // {path: 'tasks/:id', component: TasksComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TaskRouting {}
