import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { RouterModule} from '@angular/router';

// import { RightDetailUsersComponent} from './rightDetailUsers.component';
// import { AddUserByRightComponent} from './addUser/addUserByRight.component';
import { RightsComponent} from './rights/rights.component';
import { RightComponent} from './single/right.component';
// import { EditAddUserToRightComponent} from './addUser/editAddUserToRight.component';

import { RightService} from './right.service';
import { RightRouting} from './rightRouting.module';
// import { MaterialModule } from '@angular/material';

import { SharedModule } from '../shared/shared.module';


@NgModule({
  imports:      [
    RightRouting,
    CommonModule,
    FormsModule,
    // MaterialModule,
    ReactiveFormsModule,
    RouterModule,
    SharedModule,
  ],
  declarations: [
    // RightDetailUsersComponent,
    RightsComponent,
    RightComponent,
    // EditAddUserToRightComponent,
    RightComponent,

    // AddUserByRightComponent,
  ],
  exports:      [ ],
  providers:    [ RightService ],
  entryComponents: [

  ]
})
export class RightModule { }
