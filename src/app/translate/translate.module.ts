import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { RouterModule} from '@angular/router';

// import { RightDetailUsersComponent} from './rightDetailUsers.component';
// import { AddUserByRightComponent} from './addUser/addUserByRight.component';

// import { EditAddUserToRightComponent} from './addUser/editAddUserToRight.component';

import { TranslateService} from './translate.service';
import { TranslatePipe} from './translate.pipe';

// import { TRANSLATION_PROVIDERS, TranslatePipe, TranslateService }   from '../translate';
import { TRANSLATION_PROVIDERS }   from './translations';


// import { SharedModule } from '../shared/shared.module';


@NgModule({
  imports:      [
    // RightRouting,
    CommonModule,
    FormsModule,
    // MaterialModule,
    // ReactiveFormsModule,
    // RouterModule,
    // SharedModule,
  ],
  declarations: [
    // RightDetailUsersComponent,

    TranslatePipe,

    // AddUserByRightComponent,
  ],
  exports:      [
    TranslatePipe,
  ],
  providers:    [
    TRANSLATION_PROVIDERS,
    TranslateService ],
  entryComponents: [

  ]
})
export class TranslateModule { }
