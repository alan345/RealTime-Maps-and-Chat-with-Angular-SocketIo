import { NgModule } from '@angular/core';
// import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
// import { MaterialModule } from '@angular/material';




import { ChatComponent} from './single/chat.component';
// import { ChatSingleComponent} from './chatSingle/chatSingle.component';
import { ChatService} from './chat.service';
import { ChatRouting} from './chatRouting.module';
// import { ChatsComponent} from './list/chats.component';

// import {PictureModule} from '../picture/picture.module';

// import { QuoteModule} from '../quote/quote.module';

// import { DragulaModule } from 'ng2-dragula';
// import { ChatDialogComponent } from './single/dialog/chatDialog.component'
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
    ChatRouting,
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

    ChatComponent,
    // ChatsComponent,

    // ChatDialogComponent,
    // PictureComponent,
    // ChatSingleComponent,
    // AutocompleteComponent,
  ],
  exports:      [
    // ChatsComponent,
    // AutocompleteComponent,
  ],
  providers:    [ ChatService ],
  entryComponents: [
    // ChatDialogComponent,
  ]
})
export class ChatModule { }
