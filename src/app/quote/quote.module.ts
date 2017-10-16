import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { RouterModule} from '@angular/router';

// import { RoundPipe} from './round.pipe';
// import { ProjectModule} from '../project/project.module';

import { QuoteDialogComponent } from './single/dialog/quoteDialog.component';



import { QuotesComponent} from './quotes/quotes.component';
import { QuoteComponent} from './single/quote.component';

// import { QuoteDetailComponent} from './single/quoteDetail.component';
import { QuoteService} from './quote.service';
import { TemplateQuoteService} from './templateQuote.service';
import { QuoteRouting} from './quoteRouting.module';
// import { MaterialModule } from '@angular/material';

import { ProductModule } from '../product/product.module';
// import { AutocompleteComponent } from '../autocomplete/autocomplete.component'

import { SharedModule } from '../shared/shared.module';
import { SignaturePadModule } from 'angular2-signaturepad';
import { PaiementQuoteModule} from '../paiementQuote/paiementQuote.module'
// import { CKEditorModule } from 'ng2-ckeditor';

import { DragulaModule } from 'ng2-dragula';

// import { QuillModule } from 'ngx-quill'

import { QuillEditorModule } from 'ngx-quill-editor';

@NgModule({
  imports:      [
    QuillEditorModule,
    // ProjectModule,
    // QuillModule,
    QuoteRouting,
    CommonModule,
    FormsModule,
    // MaterialModule,
    ReactiveFormsModule,
    RouterModule,
    ProductModule,
    SharedModule,
    SignaturePadModule,
    PaiementQuoteModule,
    // CKEditorModule,
    DragulaModule,
    // AutocompleteComponent,
  ],
  declarations: [
    QuotesComponent,
    QuoteComponent,
    QuoteDialogComponent,
    // QuoteDetailComponent,
    // RoundPipe,
    // AutocompleteComponent
  ],
  exports:      [
    QuotesComponent,
    // AutocompleteComponent,
  ],
  providers:    [
    QuoteService,
    TemplateQuoteService
  ],
  entryComponents: [
    QuoteDialogComponent,
  ]
})
export class QuoteModule { }
