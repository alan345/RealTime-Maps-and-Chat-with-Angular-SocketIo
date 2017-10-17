import { NgModule } from '@angular/core';

import { ReactiveFormsModule} from '@angular/forms';

import { UserRouting } from './userRouting.module';



//import { UserDeleteDialog} from './userDeleteDialog.component';
//import { UserWhereDialogComponent} from './userWhereDialog.component';
//import { UserComponent} from './user.component';
//import { UsersComponent} from './users.component';
// import { UserService} from './user.service';
import { RightModule} from '../right/right.module';

import {MatSelectModule} from '@angular/material';
// import { QuoteModule} from '../quote/quote.module';
import { CompanieModule} from '../companie/companie.module';
import { ProjectModule} from '../project/project.module';

// import { UserDialogComponent } from './single/dialog/userDialog.component';
// import { PaiementPipe } from './paiement/paiement.pipe';

import { RegisterComponent} from './register/register.component';

import { NewUserComponent} from './single/newUser.component';
// import { EditUserComponent} from './singleUser/editUser.component';
import { ProfileComponent} from './single/profile.component';
// import { SingleUserComponent} from './singleUser/singleUser.component';
// import { AddNoteComponent} from './singleUser/addNote.component';
// import { ChooseDateComponent} from './singleUser/chooseDate.component';
// import { AddCategoriesToUserComponent} from './singleUser/addCategoriesToUser.component';
// import { UserCategoriesHistory} from './singleUser/userCategoriesHistory.component';

//
// import { UserProfileSettingsComponent } from './profile/userProfileSettings.component';
// import { UserProfilePicturesComponent } from './profile/userProfilePictures.component';
// import { UserProfileComponent } from './singleUser/userProfile.component';

// import { PaiementComponent } from './paiement/paiement.component';


//import { ProfileService} from './singleUser/profile.service';
import { ChangePasswordComponent } from './single/changePassword/changePassword.component';
import { ResetPasswordComponent} from './accountRecover/resetPassword.component';
import { ForgetPasswordComponent} from './accountRecover/forgetPassword.component';

import { UserService} from './user.service';
// import { PaiementService} from './paiement/paiement.service';
import { LoginComponent} from './login/login.component';


//import { UserFormsComponent} from '../form/userForms.component';

import{ AdminUsersComponent } from './users/adminUsers.component';
import{ AddUsersToObjectsComponent } from './addUsersToObjects/addUsersToObjects.component';

// import { AutocompleteComponent } from '../autocomplete/autocomplete.component'

import {SharedModule } from '../shared/shared.module';


@NgModule({
  imports:      [

    UserRouting,
    // CommonModule,
    // FormsModule,

    ReactiveFormsModule,
    // QuoteModule,
    ProjectModule,
    RightModule,
    CompanieModule,
    SharedModule,
    RightModule,
    MatSelectModule,
  ],
  declarations: [
//    UserDeleteDialog,
//    UserWhereDialogComponent,

    // AutocompleteComponent,
    NewUserComponent,
    // EditUserComponent,
    ProfileComponent,
    // UserDialogComponent,
    // SingleUserComponent,
    // AddNoteComponent,
    // ChooseDateComponent,
    // UserPicturesComponent,


    AdminUsersComponent,
    AddUsersToObjectsComponent,
    LoginComponent,
    ResetPasswordComponent,
    ForgetPasswordComponent,

    // UserProfileComponent,
    // PaiementComponent,
    // UserProfilePicturesComponent,
    // UserProfileSettingsComponent,
    ChangePasswordComponent,

    RegisterComponent,
    // PaiementPipe,


  ],
  exports:      [
    NewUserComponent,
    // EditUserComponent,
    ProfileComponent,
    AddUsersToObjectsComponent,
    // AutocompleteComponent
    // UsersComponent
   ],
  providers:    [
    // ProfileService,

    UserService,
    // PaiementService,
  ],
  entryComponents: [
    // UserDialogComponent
  //  UserDeleteDialog,
//    UserWhereDialogComponent,
  ]
})
export class UserModule { }
