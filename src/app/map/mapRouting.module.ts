import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { MapComponent} from './single/map.component';
// import { MapsComponent} from './list/maps.component';




export const routes: Routes = [
  // {path: '', component: MapsComponent},

  // {path: 'mapSingle', component: MapSingleComponent},
  // {path: 'mapSingle/:id', component: MapSingleComponent},
  {path: '', component: MapComponent},
  // {path: 'new/:idClient', component: MapSingleComponent},
  // {path: ':idMap', component: MapComponent},



  // {path: 'maps/:id', component: MapsComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MapRouting {}
