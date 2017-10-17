import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { RouterModule} from '@angular/router';


// import { ProjectModule} from '../project/project.module';

import { HomeComponent} from './home.component';
// import { EditReportingComponent} from './single/editReporting.component';


// import { ReportingService} from './reporting.service';
import { HomeRouting} from './homeRouting.module';


// import { CategorieModule } from '../categorie/categorie.module';
// import { AutocompleteComponent } from '../autocomplete/autocomplete.component'

import {SharedModule } from '../shared/shared.module';
// import { SignaturePadModule } from 'angular2-signaturepad';
// import { ChartsModule } from 'ng2-charts/ng2-charts';

// import { SideBarRightModule } from '../nav/sideBarRight/sideBarRight.module';
// import { SideBarLeftModule } from '../nav/sideBarLeft/sideBarLeft.module';




@NgModule({
  imports:      [
    // ProjectModule,

    HomeRouting,
    CommonModule,
    FormsModule,

    ReactiveFormsModule,
    RouterModule,
    // CategorieModule,
    SharedModule,
    // SideBarRightModule,
    // SideBarLeftModule,
    // SignaturePadModule,
    // ChartsModule,
    // AutocompleteComponent,
  ],
  declarations: [
    HomeComponent,



    // AutocompleteComponent
  ],
  exports:      [
    HomeComponent,

    // AutocompleteComponent,
  ],
  providers:    [
   ],
  entryComponents: [ ]
})
export class HomeModule { }
