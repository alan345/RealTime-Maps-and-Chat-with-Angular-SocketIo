import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AutocompleteComponent } from '../autocomplete/autocomplete.component'
import { FormsModule }         from '@angular/forms';
// import { UserModule} from '../user/user.module'
// import {NewUserComponent} from '../user/singleUser/newUser.component'
// import {SharedModule } from '../shared/shared.module';
import { newObjDialogComponent } from './newObjDialog/newObjDialog.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    // SharedModule,
    // UserModule,

  ],
  declarations: [
    AutocompleteComponent,
    newObjDialogComponent,
    // NewUserComponent
  ],
  exports: [
    AutocompleteComponent,
    newObjDialogComponent,
  ],
  providers: [

  ]
})
export class AutocompleteModule { }
