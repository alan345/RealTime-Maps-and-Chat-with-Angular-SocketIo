import { Routes, RouterModule } from '@angular/router';
import { NgModule }            from '@angular/core';
import { BriefsComponent} from './list/briefs.component';
import { BriefContentComponent} from './single/briefContent.component';
import { BriefSingleComponent} from './single/briefSingle.component';
// import { BriefContentComponent} from './single/briefContent.component';
// import { BriefTasksComponent} from './task/singleTask/briefTasks.component';

// import { TasksComponent} from './task/tasks/tasks.component';


export const routes: Routes = [
  {path: '', component: BriefsComponent},
  // {path: 'tasks', component: TasksComponent},
  // {path: 'tasks/new', component: BriefTasksComponent},
  // {path: 'tasks/:id', component: BriefTasksComponent},
  // {path: 'briefSingle', component: BriefSingleComponent},
  // {path: 'briefSingle/:id', component: BriefSingleComponent},
  {path: 'new', component: BriefSingleComponent},
  // {path: 'new/:selectedIndex', component: BriefSingleComponent},
  // {path: ':id/edit', component: BriefSingleComponent},
  {path: ':id', component: BriefContentComponent},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BriefRouting {}
