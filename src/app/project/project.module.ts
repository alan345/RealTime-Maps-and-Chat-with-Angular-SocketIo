import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';


// import { ProjectDialogComponent } from './single/dialog/projectDialog.component';

// import { ProjectTasksComponent} from './task/singleTask/projectTasks.component';
import { ProjectsComponent} from './list/projects.component';
import { ProjectSingleComponent} from './single/projectSingle.component';
import { ListCategoriesByProjectComponent} from './single/listCategoriesByProject.component';
import { ProjectTeamComponent} from './single/projectTeam.component';
import { ProjectContentComponent} from './single/projectContent.component';
import { ProjectService} from './project.service';
import { ProjectRouting} from './projectRouting.module';

// import { TasksComponent} from './task/tasks/tasks.component';

// //import { TaskService} from '../task/task.service';
import { StratModule} from '../strat/strat.module';
import { MissionModule} from '../mission/mission.module';

// import { DragulaModule } from 'ng2-dragula';
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
    // DragulaModule,
    ProjectRouting,
    // CommonModule,
    // FormsModule,
    
    ReactiveFormsModule,
    MissionModule,
    SharedModule,
    StratModule,
    // CommentModule,


    // AutocompleteModule,
  ],
  declarations: [
    // ProjectTasksComponent,
    ProjectsComponent,
    ProjectSingleComponent,
    ListCategoriesByProjectComponent,
    ProjectTeamComponent,
    ProjectContentComponent,
    // TasksComponent,
    // ProjectDialogComponent,
    // CommentComponent,
    // PictureComponent,
    // TaskDialogComponent,
    // AutocompleteComponent,
  ],
  exports:      [
    ProjectSingleComponent,
    ListCategoriesByProjectComponent,
    ProjectTeamComponent,
    ProjectsComponent,
    ProjectContentComponent,

    // ProjectsComponent,
    // AutocompleteComponent,
  ],
  providers:    [
    ProjectService,
    // TaskService
  ],
  entryComponents: [
    // ProjectDialogComponent,
    // TaskDialogComponent,
  ]
})
export class ProjectModule { }
