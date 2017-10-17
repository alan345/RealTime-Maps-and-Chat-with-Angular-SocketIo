import { NgModule } from '@angular/core';
// import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';





import { LogComponent} from './single/log.component';
// import { LogSingleComponent} from './logSingle/logSingle.component';
import { LogService} from './log.service';
import { LogRouting} from './logRouting.module';
import { LogsComponent} from './list/logs.component';
import { SearchComponent} from './list/search/search.component';

// import {PictureModule} from '../picture/picture.module';

// // import { QuoteModule} from '../quote/quote.module';

// import { DragulaModule } from 'ng2-dragula';
// import { LogDialogComponent } from './single/dialog/logDialog.component'
// import { AutocompleteModule } from '../autocomplete/autocomplete.module'
// import {SharedModule } from '../shared/shared.module';
import {SharedModule } from '../shared/shared.module';
// import {UserModule} from '../user/user.module';
// import { PictureComponent } from './picture/picture.component'




@NgModule({
  imports:     [
    // UserModule,
    // DragulaModule,
    SharedModule,
    LogRouting,
    // CommonModule,
    // FormsModule,
    
    ReactiveFormsModule,
    // PictureModule,
    // QuoteModule,
    // SharedModule

    // AutocompleteModule,
  ],
  declarations: [

    LogComponent,
    LogsComponent,
    SearchComponent,

    // LogDialogComponent,
    // PictureComponent,
    // LogSingleComponent,
    // AutocompleteComponent,
  ],
  exports:      [
    LogsComponent,
    // AutocompleteComponent,
  ],
  providers:    [ LogService ],
  entryComponents: [
    // LogDialogComponent,
  ]
})
export class LogModule { }
