import { NgModule }            from '@angular/core';
import { CommonModule }        from '@angular/common';
import { FormsModule }         from '@angular/forms';

// import { AutocompleteComponent } from '../autocomplete/autocomplete.component'
import { AutocompleteModule } from '../autocomplete/autocomplete.module'
import {PictureModule} from '../picture/picture.module';
import {MatProgressBarModule} from '@angular/material';
import {MatPaginatorModule} from '@angular/material';
import {MatInputModule} from '@angular/material';
// import {CommentModule} from '../comment/comment.module';
import {MatSidenavModule} from '@angular/material';

import {MatCardModule} from '@angular/material';


import { RoundPipe} from './round.pipe';

// import { newObjDialogComponent } from '../nav/newObjDialog/newObjDialog.component';



import { LoadingInAppComponent } from '../nav/loadingInApp/loadingInApp.component';
import { LoginInAppComponent } from '../nav/loginInApp/loginInApp.component';
// import { SideBarObjModule } from '../nav/sideBarObj/sideBarObj.module';


// import {CommentModule} from '../comment/comment.module';

@NgModule({
  imports:      [
    CommonModule,
    FormsModule,
    // AutocompleteModule,
    PictureModule,
    MatProgressBarModule,
    MatInputModule,
    MatPaginatorModule,
    MatSidenavModule,
    MatCardModule,
    // CommentModule,

    // SideBarObjModule,



  ],
  declarations: [
    RoundPipe,
    // AutocompleteComponent,
    // TranslatePipe,
    // HeaderComponent,
    // newObjDialogComponent,
    LoadingInAppComponent,
    LoginInAppComponent,
    // SideBarObjComponent,


  ],
  exports: [

    // TranslatePipe,
    // AutocompleteModule,
    CommonModule,
    FormsModule,
    RoundPipe,
    MatProgressBarModule,
    MatPaginatorModule,
    MatInputModule,
    MatSidenavModule,
    MatCardModule,
    // SideBarObjModule,
    // HeaderComponent,
    // newObjDialogComponent,
    // LoadingComponent,
    LoadingInAppComponent,
    LoginInAppComponent,
    // SideBarObjComponent,
    PictureModule,

    // CommentModule,
    // CommentModule,
    // AutocompleteComponent,
  ],
  providers: [
    // TRANSLATION_PROVIDERS,
    // TranslateService,
  ]
})
export class SharedSmallModule { }
