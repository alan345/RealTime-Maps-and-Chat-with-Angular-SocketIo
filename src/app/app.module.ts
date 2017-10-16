import { BrowserModule} from '@angular/platform-browser';
import { NgModule} from '@angular/core';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpModule, RequestOptions, Http} from '@angular/http';
import { AppComponent} from './app.component';
// import { NgbModule} from '@ng-bootstrap/ng-bootstrap';
// import { MaterialModule } from '@angular/material';
import {MatSidenavModule} from '@angular/material';


import { GlobalEventsManager } from './globalEventsManager';

//
// import { ProgressBarModule} from 'ng2-progress-bar';
import { RouterModule} from '@angular/router';
import { CommonModule, HashLocationStrategy, LocationStrategy} from '@angular/common';
import { BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { AuthHttp, AuthConfig} from 'angular2-jwt';

import { ToastModule} from 'ng2-toastr/ng2-toastr';
import { ToastOptions} from 'ng2-toastr';
import { CustomOption } from './toast-options';
// import { CKEditorModule } from 'ng2-ckeditor';



// import { NavbarComponent} from './nav/navbar/navbar.component';
import { NavbarModule} from './nav/navbar/navbar.module';
import { SidebarModule} from './nav/sidebar/sidebar.module';

import { FooterComponent} from './nav/footer/footer.component';

import { LoadingComponent} from './nav/loading/loading.component';

// import { AutocompleteComponent } from './autocomplete/autocomplete.component'



// import { FormService} from './form/form.service';
// import { UserFormsComponent} from './form/userForms.component';
// import { UserFormsUploadAndList} from './form/userFormsUploadAndList.component';
// import { FormComponent} from './form/form.component';


// import { RegisterComponent} from './user/register/register.component';
// import { UserComponent} from './user/user.component';
// import { NewUserComponent} from './user/users/newUser.component';
// import { SingleUserComponent} from './user/users/singleUser.component';
// import { AddNoteComponent} from './user/users/addNote.component';
// import { ChooseDateComponent} from './user/users/chooseDate.component';
// import { AddProductsToUserComponent} from './user/users/addProductsToUser.component';
// import { UserProductsHistory} from './user/users/userProductsHistory.component';
//




import { DeleteDialog} from './deleteDialog/deleteDialog.component';
// import { SeePictureDialogComponent} from './seePictureDialog/seePictureDialog.component';


//
// import { PressComponent} from './press/press.component';
// import { PressesComponent} from './press/presses.component';
// import { PressSingleComponent} from './press/pressSingle.component';
// import { PressService} from './press/press.service';
//


//import { ProductModule} from './product/product.module';
//import { ProjectModule} from './project/project.module';
import { UserModule} from './user/user.module';
// import { ProductModule} from './product/product.module';
//import { CompanieModule} from './companie/companie.module';

//import { QuoteModule} from './quote/quote.module';





import { AutocompleteComponent } from './autocomplete/autocomplete.component'




import { AppRoutingModule} from './appRouting.module';

import { AuthGuardService} from './auth/authguard.service';
import { AuthService} from './auth/auth.service';
import { ErrorService} from './errorHandler/error.service';


import { ErrorComponent} from './errorHandler/error.component';


import { MainPageHomeComponent} from './mainPageHome/mainPageHome.component';
import { MainPageHomeService} from './mainPageHome/mainPageHome.service';





import { ErrorPageComponent} from './errorPage/errorPage.component';



//import { AdminUsersComponent} from './admin/user/adminUsers.component';
import { AdminService} from './admin/services/admin.service';


// import { EditOptionsComponentDialog} from './form/modalLibrary/modalLibrary.component';
//


import { AdminGuardService} from './admin/services/adminGuard';
import { CompanieGuardService} from './companie/companieGuard.service';
import { PaiementGuardService} from './user/paiement/paiementGuard.service';


import { AdminComponent} from './admin/admin.component';


//import {CalendarComponent} from "angular2-fullcalendar/src/calendar/calendar";






export function authHttpServiceFactory(http: Http, options: RequestOptions) {
  return new AuthHttp( new AuthConfig({}), http, options);
}

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    LoadingComponent,
    // NavbarComponent,
  //  CalendarComponent,

    // AutocompleteComponent,
    // ProductComponent,
    // ProductsComponent,
    // NewProductComponent,
    // SingleProductComponent,

    DeleteDialog,
    // SeePictureDialogComponent,


    // PressComponent,
    // PressesComponent,
    // PressSingleComponent,
    //



    // UserComponent,
    // NewUserComponent,
    // SingleUserComponent,
    // AddNoteComponent,
    // ChooseDateComponent,
    // UserPicturesComponent,
    // AddProductsToUserComponent,
    // UserProductsHistory,
    //
    //
    // RegisterComponent,





    ErrorComponent,

    MainPageHomeComponent,


    // CompanieDetailUsersComponent,
    // CompaniePicturesComponent,
    // CompaniesComponent,
    // CompanieComponent,
    // EditCompanieComponent,
    // EditAddUserToCompanieComponent,
    // CompanieDetailComponent,
    // CompanieFilterPipe,


  //  CompanieAddUserDialog,




    // FormComponent,

    ErrorPageComponent,

  //  AdminUsersComponent,

    // EditOptionsComponentDialog,
    AdminComponent,


  ],
  imports: [
    BrowserModule,
    CommonModule,
    HttpModule,
    RouterModule,
    ReactiveFormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ToastModule.forRoot(),
    // ProgressBarModule,
    FormsModule,
    // MaterialModule,
    NavbarModule,
    SidebarModule,
    MatSidenavModule,
    // CKEditorModule,
    // NgbModule.forRoot(),
    UserModule,
    // AutocompleteComponent,

  //  ProjectModule,
//    ProductModule,
  //  CompanieModule,
  //  QuoteModule,




  ],
  exports: [
    UserModule,
    MatSidenavModule
   ],
  providers: [
    AuthGuardService,
    {provide: LocationStrategy, useClass: HashLocationStrategy},
    AuthService,
    ErrorService,
//    CompanieService,
    //ProductService,
    MainPageHomeService,
  //  PressService,
    // FormService,
    AdminService,
  //  UserService,
  //  ProductService,
  //  PromotionService,
    AdminGuardService,
    CompanieGuardService,
    PaiementGuardService,
    GlobalEventsManager,
    // TRANSLATION_PROVIDERS,
    // TranslateService,
  //  ProfileService,
    {
      provide: AuthHttp,
      useFactory: authHttpServiceFactory,
      deps: [ Http, RequestOptions ]
    },
    {provide: ToastOptions, useClass: CustomOption},
  ],
  entryComponents: [
  //  CompanieAddUserDialog,
    DeleteDialog,

  //  PromotionDeleteDialog,
    // EditOptionsComponentDialog,
    // ProductDeleteDialog,
    // ProductWhereDialogComponent,

  ],


  bootstrap: [AppComponent],
//  bootstrap: [AppComponent, EditOptionsComponentDialog],
})
export class AppModule {}
