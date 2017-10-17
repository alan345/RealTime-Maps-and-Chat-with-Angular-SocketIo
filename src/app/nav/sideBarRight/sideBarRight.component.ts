import {Component, OnInit, ViewChild} from '@angular/core';
// import {AuthService} from '../../auth/auth.service';
import { GlobalEventsManager} from '../../globalEventsManager';
import {MatSidenav} from '@angular/material';
import {ShowNavBarData} from '../../home/home.model'

@Component({
  selector: 'app-sideBarRight',
  templateUrl: './sideBarRight.component.html',
  styleUrls: ['./sideBarRight.component.css']
})
export class SideBarRightComponent implements OnInit {
  @ViewChild('sidenav') public sidenav: MatSidenav;

  showNavBarData: ShowNavBarData = new ShowNavBarData()

  constructor(
    private globalEventsManager: GlobalEventsManager,
  ) {

    this.globalEventsManager.showNavBarEmitterRight.subscribe((showNavBarData)=>{
        if (showNavBarData !== null) {
          this.showNavBarData = showNavBarData;
          if(this.showNavBarData.showNavBar) {
            this.sidenav.open()
          } else {
            this.sidenav.close()
          }
        }
    })
  }


  ngOnInit() {}

  sideNavAction(side: string, showNavBar: boolean, typeObj: string) {
    this.showNavBarData.showNavBar = showNavBar
    this.showNavBarData.search.typeObj = typeObj
    this.globalEventsManager.showNavBarRight(this.showNavBarData);
  }


}
