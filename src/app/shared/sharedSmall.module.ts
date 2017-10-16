import { NgModule }            from '@angular/core';
import { CommonModule }        from '@angular/common';
import { FormsModule }         from '@angular/forms';

// import { AutocompleteComponent } from '../autocomplete/autocomplete.component'
import { AutocompleteModule } from '../autocomplete/autocomplete.module'
import {PictureModule} from '../picture/picture.module';

// import {CommentModule} from '../comment/comment.module';


// import { TRANSLATION_PROVIDERS, TranslatePipe, TranslateService }   from '../translate';

import { RoundPipe} from './round.pipe';
import { HeaderComponent } from '../nav/header/header.component';
// import { newObjDialogComponent } from '../nav/newObjDialog/newObjDialog.component';

// import { MaterialModule } from '@angular/material';

import { LoadingInAppComponent } from '../nav/loadingInApp/loadingInApp.component';
import { LoginInAppComponent } from '../nav/loginInApp/loginInApp.component';

import {CommentModule} from '../comment/comment.module';
import { TranslateModule}   from '../translate/translate.module';
import { MatPaginatorModule} from '@angular/material';
import {MatDialogModule} from '@angular/material';




@NgModule({
  imports:      [
    CommonModule,
    FormsModule,
    // AutocompleteModule,
    PictureModule,
    // CommentModule,
    // MaterialModule,
    MatPaginatorModule,
    MatDialogModule,
    TranslateModule,



  ],
  declarations: [
    RoundPipe,
    // AutocompleteComponent,
    // TranslatePipe,
    // HeaderComponent,
    // newObjDialogComponent,
    LoadingInAppComponent,
    LoginInAppComponent,


  ],
  exports: [
    // TranslatePipe,
    // AutocompleteModule,
    CommonModule,
    FormsModule,
    RoundPipe,
    MatDialogModule,
    // HeaderComponent,
    // newObjDialogComponent,
    // LoadingComponent,
    LoadingInAppComponent,
    LoginInAppComponent,
    PictureModule,
    // MaterialModule,
    MatPaginatorModule,
    TranslateModule,
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
