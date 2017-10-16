import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { RouterModule} from '@angular/router';


// import { ProjectModule} from '../project/project.module';

import { ReportingsComponent} from './reportings.component';
// import { EditReportingComponent} from './single/editReporting.component';


// import { ReportingService} from './reporting.service';
import { ReportingRouting} from './reportingRouting.module';
// import { MaterialModule } from '@angular/material';

import { ProductModule } from '../product/product.module';
// import { AutocompleteComponent } from '../autocomplete/autocomplete.component'

import {SharedModule } from '../shared/shared.module';
import { SignaturePadModule } from 'angular2-signaturepad';
import { ChartsModule } from 'ng2-charts/ng2-charts';


@NgModule({
  imports:      [
    // ProjectModule,

    ReportingRouting,
    CommonModule,
    FormsModule,
    // MaterialModule,
    ReactiveFormsModule,
    RouterModule,
    ProductModule,
    SharedModule,
    SignaturePadModule,
    ChartsModule,
    // AutocompleteComponent,
  ],
  declarations: [
    ReportingsComponent,



    // AutocompleteComponent
  ],
  exports:      [
    ReportingsComponent,

    // AutocompleteComponent,
  ],
  providers:    [
   ],
  entryComponents: [ ]
})
export class ReportingModule { }
