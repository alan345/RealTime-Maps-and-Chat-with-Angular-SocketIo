import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';





import { MissionComponent} from './single/mission.component';
import { MissionTeamComponent} from './single/missionTeam.component';
import { MissionContentComponent} from './single/missionContent.component';
// import { MissionSingleComponent} from './missionSingle/missionSingle.component';
import { MissionService} from './mission.service';
import { MissionRouting} from './missionRouting.module';
import { MissionsComponent} from './list/missions.component';
import { LightMissionsComponent} from './list/lightMissions.component';

// import { ProjectMissionsComponent} from './project/projectMissions.component';
// // import { QuoteModule} from '../quote/quote.module';


// import { MissionDialogComponent } from './single/dialog/missionDialog.component'
// import { AutocompleteModule } from '../autocomplete/autocomplete.module'
import {SharedModule } from '../shared/shared.module';
// import {UserModule} from '../user/user.module';
import {DocumentModule} from '../document/document.module';
import {ChatModule} from '../chat/chat.module';




@NgModule({
  imports:     [
    // UserModule,
    MissionRouting,
    CommonModule,
    FormsModule,

    ReactiveFormsModule,
    // QuoteModule,
    SharedModule,
    DocumentModule,
    ChatModule,
    // AutocompleteModule,
  ],
  declarations: [

    MissionComponent,
    MissionTeamComponent,
    MissionContentComponent,
    MissionsComponent,
    LightMissionsComponent,
    // ProjectMissionsComponent,
    // MissionDialogComponent,
    // MissionSingleComponent,
    // AutocompleteComponent,
  ],
  exports:      [
    MissionComponent,
    MissionTeamComponent,
    MissionsComponent,
    LightMissionsComponent,
    // AutocompleteComponent,
  ],
  providers:    [ MissionService ],
  entryComponents: [
    // MissionDialogComponent,
  ]
})
export class MissionModule { }
