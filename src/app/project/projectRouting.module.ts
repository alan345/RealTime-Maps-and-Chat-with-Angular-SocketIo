import { Routes, RouterModule } from '@angular/router';
import { NgModule }            from '@angular/core';
import { ProjectsComponent} from './list/projects.component';
import { ProjectSingleComponent} from './single/projectSingle.component';
import { ProjectContentComponent} from './single/projectContent.component';
// import { ProjectTasksComponent} from './task/singleTask/projectTasks.component';

// import { TasksComponent} from './task/tasks/tasks.component';


export const routes: Routes = [
  {path: '', component: ProjectsComponent},
  // {path: 'tasks', component: TasksComponent},
  // {path: 'tasks/new', component: ProjectTasksComponent},
  // {path: 'tasks/:id', component: ProjectTasksComponent},

  // {path: 'projectSingle', component: ProjectSingleComponent},
  // {path: 'projectSingle/:id', component: ProjectSingleComponent},
  {path: 'new', component: ProjectSingleComponent},
  // {path: 'new/:selectedIndex', component: ProjectSingleComponent},
  // {path: ':id/edit', component: ProjectSingleComponent},
  {path: ':id', component: ProjectContentComponent},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjectRouting {}
