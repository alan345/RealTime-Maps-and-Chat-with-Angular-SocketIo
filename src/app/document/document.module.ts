import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';


// import { DocumentDialogComponent } from './single/dialog/documentDialog.component';

// import { DocumentTasksComponent} from './task/singleTask/documentTasks.component';
import { DocumentsComponent} from './list/documents.component';
import { DocumentSingleComponent} from './single/documentSingle.component';
// import { DocumentContentComponent} from './single/documentContent.component';
import { DocumentService} from './document.service';
import { DocumentRouting} from './documentRouting.module';
import {MatSlideToggleModule} from '@angular/material';
// import { TasksComponent} from './task/tasks/tasks.component';

//import { TaskService} from '../task/task.service';
// import { MissionModule} from '../mission/mission.module';


// import { AutocompleteComponent } from '../autocomplete/autocomplete.component'
// import { AutocompleteModule } from '../autocomplete/autocomplete.module'
import {SharedModule } from '../shared/shared.module';
// import {CommentModule} from '../comment/comment.module';
// import { TaskDialogComponent } from '../task/single/dialog/taskDialog.component'

// import { CommentComponent } from './single/comment/comment.component'
// import { PictureComponent } from './single/picture/picture.component'


@NgModule({
  imports:     [
    // UserModule,

    DocumentRouting,
    // CommonModule,
    // FormsModule,

    ReactiveFormsModule,
    // MissionModule,
    SharedModule,
    MatSlideToggleModule,
    // CommentModule,


    // AutocompleteModule,
  ],
  declarations: [
    // DocumentTasksComponent,
    DocumentsComponent,
    DocumentSingleComponent,
    // DocumentContentComponent,
    // TasksComponent,
    // DocumentDialogComponent,
    // CommentComponent,
    // PictureComponent,
    // TaskDialogComponent,
    // AutocompleteComponent,
  ],
  exports:      [
    DocumentSingleComponent,
    DocumentsComponent,
    // DocumentContentComponent,

    // DocumentsComponent,
    // AutocompleteComponent,
  ],
  providers:    [
    DocumentService,
    // TaskService
  ],
  entryComponents: [
    // DocumentDialogComponent,
    // TaskDialogComponent,
  ]
})
export class DocumentModule { }
