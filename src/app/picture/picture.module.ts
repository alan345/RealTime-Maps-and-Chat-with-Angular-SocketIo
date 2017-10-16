import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PictureComponent } from './picture.component'
import { FormsModule }         from '@angular/forms';
// import { UserModule} from '../user/user.module'
// import {NewUserComponent} from '../user/singleUser/newUser.component'
// import {SharedModule } from '../shared/shared.module';
// import { newObjDialogComponent } from './newObjDialog/newObjDialog.component';

import { FormService} from './form/form.service';
import { UserFormsComponent} from './form/list/userForms.component';
import { UserFormsUploadAndList} from './form/both/userFormsUploadAndList.component';
// import { SeePictureDialogComponent} from './form/seePictureDialog/seePictureDialog.component';

import { EditOptionsComponentDialog} from './form/single/modalLibrary/modalLibrary.component';

import { FormComponent} from './form/single/form.component';
// import { MaterialModule } from '@angular/material';
import { ProgressBarModule} from 'ng2-progress-bar';
import { MatTabsModule} from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    // SharedModule,
    // UserModule,
    // MaterialModule,
    MatTabsModule,
    ProgressBarModule,

  ],
  declarations: [
    PictureComponent,
    UserFormsComponent,
    UserFormsUploadAndList,
    // SeePictureDialogComponent,
    EditOptionsComponentDialog,
    FormComponent,
    // NewUserComponent
  ],
  exports: [
    PictureComponent,

  ],
  providers: [
    FormService,
  ],
  entryComponents: [
    // SeePictureDialogComponent,
    EditOptionsComponentDialog,
  ]
})
export class PictureModule { }
