import { Routes, RouterModule } from '@angular/router';
import { NgModule }            from '@angular/core';
import { LogComponent} from './single/log.component';
import { LogsComponent} from './list/logs.component';




export const routes: Routes = [
  {path: '', component: LogsComponent},

  // {path: 'logSingle', component: LogSingleComponent},
  // {path: 'logSingle/:id', component: LogSingleComponent},
  {path: 'new', component: LogComponent},
  // {path: 'new/:idClient', component: LogSingleComponent},
  {path: ':idLog', component: LogComponent},



  // {path: 'logs/:id', component: LogsComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LogRouting {}
