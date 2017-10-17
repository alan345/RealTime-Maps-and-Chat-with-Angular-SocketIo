import { NgModule }            from '@angular/core';
import { CommonModule }        from '@angular/common';
import { FormsModule }         from '@angular/forms';

// import { AutocompleteComponent } from '../autocomplete/autocomplete.component'
import { AutocompleteModule } from '../autocomplete/autocomplete.module'
import {PictureModule} from '../picture/picture.module';

// import {CommentModule} from '../comment/comment.module';


// import { TRANSLATION_PROVIDERS, TranslatePipe, TranslateService }   from '../translate';

import { RoundPipe} from './round.pipe';

import { NavbarModule } from '../nav/navbar/navbar.module';


// import { newObjDialogComponent } from '../nav/newObjDialog/newObjDialog.component';


import { LoadingInAppComponent } from '../nav/loadingInApp/loadingInApp.component';
import { LoginInAppComponent } from '../nav/loginInApp/loginInApp.component';

// import {CommentModule} from '../comment/comment.module';

import {SharedSmallModule} from './sharedSmall.module'
@NgModule({
  imports:      [
    SharedSmallModule,
    CommonModule,
    FormsModule,
    AutocompleteModule,
    PictureModule,
    // CommentModule,
    NavbarModule,

    // CommentModule,


  ],
  declarations: [
    // RoundPipe,
    // AutocompleteComponent,
    // TranslatePipe,


    // newObjDialogComponent,
    // LoadingInAppComponent,
    // LoginInAppComponent,


  ],
  exports: [
    // TranslatePipe,
    SharedSmallModule,
    AutocompleteModule,
    CommonModule,
    FormsModule,
    // RoundPipe,

    NavbarModule,
    // newObjDialogComponent,
    // LoadingComponent,
    // LoadingInAppComponent,
    // LoginInAppComponent,
    // PictureModule,
    // CommentModule,
    // CommentModule,
    // AutocompleteComponent,
  ],
  providers: [
    // TRANSLATION_PROVIDERS,
    // TranslateService,
  ]
})
export class SharedModule { }
