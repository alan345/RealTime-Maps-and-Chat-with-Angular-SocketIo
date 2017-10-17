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



import {SharedModule} from './shared.module';
import {UserModule} from '../user/user.module';
import {ProjectModule} from '../project/project.module';


// import {NewObjModule} from '../nav/newObj/newObj.module';
import {DocumentModule} from '../document/document.module';




@NgModule({
  imports:      [
    SharedModule,
    UserModule,
    // NewObjModule,
    // CommonModule,
    // FormsModule,
    ProjectModule,

    DocumentModule,

    // CommonModule,
    // FormsModule,
    // AutocompleteModule,
    // PictureModule,
    // CommentModule,
    // NavbarModule,

    // CommentModule,


  ],
  declarations: [
    // RoundPipe,
    // AutocompleteComponent,
    // TranslatePipe,
    // HeaderComponent,

    // newObjDialogComponent,
    // LoadingInAppComponent,
    // LoginInAppComponent,


  ],
  exports: [
    // TranslatePipe,
    SharedModule,
    UserModule,

    // NewObjModule,
    // CommonModule,
    // FormsModule,
    ProjectModule,

    DocumentModule,

  ],
  providers: [
    // TRANSLATION_PROVIDERS,
    // TranslateService,
  ]
})
export class SharedObjModule { }
