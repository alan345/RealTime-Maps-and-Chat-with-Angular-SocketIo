import { Component, OnInit, ViewChild } from '@angular/core';
import { HomeService} from './home.service';
import { FormGroup } from '@angular/forms';
import { ToastsManager} from 'ng2-toastr';
import { MatDialog} from '@angular/material';
// import { EditOptionsComponentDialog }  from '../form/modalLibrary/modalLibrary.component';
import { AdminService} from '../admin/services/admin.service';
// import { SideBarRightComponent} from '../nav/sideBarRight/sideBarRight.component';
// import { SideBarLeftComponent} from '../nav/sideBarLeft/sideBarLeft.component';

import {Search} from './home.model'
// import { Options } from './options.model';
import { Router} from '@angular/router';
import { AuthService} from '../auth/auth.service';
import { User} from '../user/user.model';

@Component({
  selector: 'app-admin',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  // @ViewChild(SideBarRightComponent) private sideBarRightComponent: SideBarRightComponent;
  // @ViewChild(SideBarLeftComponent) private sideBarLeftComponent: SideBarLeftComponent;
  fetchedUser: User = new User();
  search: Search = new Search(


  )
  constructor(

    private router:Router,
    private adminService: AdminService,
    private homeService: HomeService,
    private toastr: ToastsManager,
    // public dialog: MatDialog,

    private authService: AuthService,
  ) {}

  ngOnInit() {
    // this.fetchedUser = this.authService.getCurrentUser()
  }
  // sideNavRightOpen(typeObj: string, id: string) {
  //   if(typeObj === 'user') this.search.userId = id;
  //   if(typeObj === 'project') this.search.projectId = id;
  //
  //   this.search.typeObj = typeObj;
  //
  //   // this.sideBarRightComponent.sidenavOpen(this.search)
  //   // sidenav.open()
  // }

  // sideNavLeftOpen(typeObj: string) {
  //
  //   // this.sideBarLeftComponent.sidenavOpen(this.search)
  //   // sidenav.open()
  // }

  //
  // goTo(path: string) {
  //
  //     this.router.navigate([path]);
  //
  //
  //
  //   // if( (this.isAdmin() || this.isManager()) && path === 'user') {
  //   //   if(this.companies.length)
  //   //     this.router.navigate(['/companie/' + this.companies[0]._id + '/users']);
  //   // } else {
  //   //   this.router.navigate([path]);
  //   // }
  // }
  // showObjHTML(nameObject) {
  //   return true;
  //   // return this.authService.showObjHTML(nameObject)
  // }
  //
  //
  // isAdmin() {
  //   return this.authService.isAdmin();
  // }


}
