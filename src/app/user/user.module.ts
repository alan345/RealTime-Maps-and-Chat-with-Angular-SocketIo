import { NgModule } from '@angular/core';

import { ReactiveFormsModule} from '@angular/forms';

import { UserRouting } from './userRouting.module';
// import { MaterialModule } from '@angular/material';


//import { UserDeleteDialog} from './userDeleteDialog.component';
//import { UserWhereDialogComponent} from './userWhereDialog.component';
//import { UserComponent} from './user.component';
//import { UsersComponent} from './users.component';
// import { UserService} from './user.service';
import { RightModule} from '../right/right.module';


import { QuoteModule} from '../quote/quote.module';
import { CompanieModule} from '../companie/companie.module';
import { ProjectModule} from '../project/project.module';

import { UserDialogComponent } from './singleUser/dialog/userDialog.component';
import { PaiementPipe } from './paiement/paiement.pipe';

import { RegisterComponent} from './register/register.component';

import { NewUserComponent} from './singleUser/newUser.component';
// import { SingleUserComponent} from './singleUser/singleUser.component';
// import { AddNoteComponent} from './singleUser/addNote.component';
// import { ChooseDateComponent} from './singleUser/chooseDate.component';
// import { AddProductsToUserComponent} from './singleUser/addProductsToUser.component';
// import { UserProductsHistory} from './singleUser/userProductsHistory.component';

//
// import { UserProfileSettingsComponent } from './profile/userProfileSettings.component';
// import { UserProfilePicturesComponent } from './profile/userProfilePictures.component';
// import { UserProfileComponent } from './singleUser/userProfile.component';

import { PaiementComponent } from './paiement/paiement.component';


//import { ProfileService} from './singleUser/profile.service';
import { ChangePasswordComponent } from './singleUser/changePassword/changePassword.component';
import { ResetPasswordComponent} from './accountRecover/resetPassword.component';
import { ForgetPasswordComponent} from './accountRecover/forgetPassword.component';

import { UserService} from './user.service';
import { PaiementService} from './paiement/paiement.service';
import { LoginComponent} from './login/login.component';


//import { UserFormsComponent} from '../form/userForms.component';

import{ AdminUsersComponent } from './users/adminUsers.component';

// import { AutocompleteComponent } from '../autocomplete/autocomplete.component'

import {SharedModule } from '../shared/shared.module';


@NgModule({
  imports:      [

    UserRouting,
    // CommonModule,
    // FormsModule,
    // MaterialModule,
    ReactiveFormsModule,
    QuoteModule,
    ProjectModule,
    RightModule,
    CompanieModule,
    SharedModule,
    RightModule,
  ],
  declarations: [
//    UserDeleteDialog,
//    UserWhereDialogComponent,

    // AutocompleteComponent,
    NewUserComponent,
    UserDialogComponent,
    // SingleUserComponent,
    // AddNoteComponent,
    // ChooseDateComponent,
    // UserPicturesComponent,


    AdminUsersComponent,
    LoginComponent,
    ResetPasswordComponent,
    ForgetPasswordComponent,

    // UserProfileComponent,
    PaiementComponent,
    // UserProfilePicturesComponent,
    // UserProfileSettingsComponent,
    ChangePasswordComponent,

    RegisterComponent,
    PaiementPipe,


  ],
  exports:      [
    // NewUserComponent,
    // AutocompleteComponent
    // UsersComponent
   ],
  providers:    [
    // ProfileService,

    UserService,
    PaiementService,
  ],
  entryComponents: [
    UserDialogComponent
  //  UserDeleteDialog,
//    UserWhereDialogComponent,
  ]
})
export class UserModule { }
