import { NgModule } from '@angular/core';
// import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
// import { MaterialModule } from '@angular/material';




import { CommentComponent} from './single/comment.component';
// import { CommentSingleComponent} from './commentSingle/commentSingle.component';
import { CommentService} from './comment.service';
import { CommentRouting} from './commentRouting.module';
import { CommentsComponent} from './list/comments.component';

// import {PictureModule} from '../picture/picture.module';

// import { QuoteModule} from '../quote/quote.module';

// import { DragulaModule } from 'ng2-dragula';
import { CommentDialogComponent } from './single/dialog/commentDialog.component'
// import { AutocompleteModule } from '../autocomplete/autocomplete.module'
// import {SharedModule } from '../shared/shared.module';
import {SharedSmallModule } from '../shared/sharedSmall.module';
// import {UserModule} from '../user/user.module';
// import { PictureComponent } from './picture/picture.component'




@NgModule({
  imports:     [
    // UserModule,
    // DragulaModule,
    SharedSmallModule,
    CommentRouting,
    // CommonModule,
    // FormsModule,
    // MaterialModule,
    ReactiveFormsModule,
    // PictureModule,
    // QuoteModule,
    // SharedModule

    // AutocompleteModule,
  ],
  declarations: [

    CommentComponent,
    CommentsComponent,

    CommentDialogComponent,
    // PictureComponent,
    // CommentSingleComponent,
    // AutocompleteComponent,
  ],
  exports:      [
    CommentsComponent,
    // AutocompleteComponent,
  ],
  providers:    [ CommentService ],
  entryComponents: [
    CommentDialogComponent,
  ]
})
export class CommentModule { }
