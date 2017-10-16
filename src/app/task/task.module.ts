import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
// import { MaterialModule } from '@angular/material';




import { TaskComponent} from './single/task.component';
// import { TaskSingleComponent} from './taskSingle/taskSingle.component';
import { TaskService} from './task.service';
import { TaskRouting} from './taskRouting.module';
import { TasksComponent} from './tasks/tasks.component';

import { ProjectTasksComponent} from './project/projectTasks.component';
import { QuoteModule} from '../quote/quote.module';

import { DragulaModule } from 'ng2-dragula';
import { TaskDialogComponent } from './single/dialog/taskDialog.component'
// import { AutocompleteModule } from '../autocomplete/autocomplete.module'
import {SharedModule } from '../shared/shared.module';
// import {UserModule} from '../user/user.module';

@NgModule({
  imports:     [
    // UserModule,
    DragulaModule,
    TaskRouting,
    CommonModule,
    FormsModule,
    // MaterialModule,
    ReactiveFormsModule,
    QuoteModule,
    SharedModule

    // AutocompleteModule,
  ],
  declarations: [

    TaskComponent,
    TasksComponent,
    ProjectTasksComponent,
    TaskDialogComponent,
    // TaskSingleComponent,
    // AutocompleteComponent,
  ],
  exports:      [
    TaskComponent,
    // AutocompleteComponent,
  ],
  providers:    [ TaskService ],
  entryComponents: [
    TaskDialogComponent,
  ]
})
export class TaskModule { }
