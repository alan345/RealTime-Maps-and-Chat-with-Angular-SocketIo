import { NgModule } from '@angular/core';
// import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';




import { MapComponent} from './single/map.component';
// import { MapSingleComponent} from './mapSingle/mapSingle.component';
import { MapService} from './map.service';
import { MapRouting} from './mapRouting.module';

import {SharedSmallModule } from '../shared/sharedSmall.module';


import { AgmCoreModule } from '@agm/core';

@NgModule({
  imports:     [
    // UserModule,
    // DragulaModule,
    SharedSmallModule,
    MapRouting,
    // CommonModule,
    // FormsModule,

    ReactiveFormsModule,
    // PictureModule,
    // QuoteModule,
    // SharedModule
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyANerDDERQloD91gWN5WNbe6TPqa07GZXY'
    })
    // AutocompleteModule,
  ],
  declarations: [

    MapComponent,
    // MapsComponent,

    // MapDialogComponent,
    // PictureComponent,
    // MapSingleComponent,
    // AutocompleteComponent,
  ],
  exports:      [
    MapComponent,
    // MapsComponent,
    // AutocompleteComponent,
  ],
  providers:    [ MapService ],
  entryComponents: [
    // MapDialogComponent,
  ]
})
export class MapModule { }
