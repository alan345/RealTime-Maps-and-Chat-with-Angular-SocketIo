import { Routes, RouterModule } from '@angular/router';
import { NgModule }            from '@angular/core';
import { DocumentsComponent} from './list/documents.component';
import { DocumentSingleComponent} from './single/documentSingle.component';
// import { DocumentContentComponent} from './single/documentContent.component';
// import { DocumentTasksComponent} from './task/singleTask/documentTasks.component';

// import { TasksComponent} from './task/tasks/tasks.component';


export const routes: Routes = [
  {path: '', component: DocumentsComponent},
  // {path: 'tasks', component: TasksComponent},
  // {path: 'tasks/new', component: DocumentTasksComponent},
  // {path: 'tasks/:id', component: DocumentTasksComponent},
  // {path: 'documentSingle', component: DocumentSingleComponent},
  // {path: 'documentSingle/:id', component: DocumentSingleComponent},
  {path: 'new', component: DocumentSingleComponent},
  // {path: 'new/:selectedIndex', component: DocumentSingleComponent},
  // {path: ':id/edit', component: DocumentSingleComponent},
  {path: ':id', component: DocumentSingleComponent},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DocumentRouting {}
