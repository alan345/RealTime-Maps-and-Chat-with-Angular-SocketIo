import {Component, OnInit, Input, ViewChild} from '@angular/core';
import {AuthService} from '../../auth/auth.service';
import {AdminService} from '../../admin/services/admin.service';
import {Router} from '@angular/router';
import { UserService} from '../../user/user.service';
import { User} from '../../user/user.model';
import { CompanieGuardService} from '../../companie/companieGuard.service'
// import { PaiementGuardService} from '../../user/paiement/paiementGuard.service'
// import { ChangeDetectionStrategy} from '@angular/core';
// import {GlobalEventsManager} from '../../globalEventsManager';
// import {MatSidenav} from '@angular/material';
// import {ShowNavBarData} from '../../home/home.model'


@Component({
  selector: 'app-sideBarLeft',
  // changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './sideBarLeft.component.html',
  styleUrls: ['./sideBarLeft.component.css']
})
export class SideBarLeftComponent implements OnInit {
  // @ViewChild('sidenav') public sidenav: MatSidenav;
  // @Input() sidenav: any;
  // showNavBarData: ShowNavBarData = new ShowNavBarData()
 // private userId: string = localStorage.getItem('userId');
  // private userId: string;
  fetchedUser: User = new User();

  constructor(
    // private globalEventsManager: GlobalEventsManager,
    private authService: AuthService,
    private adminService: AdminService,
    private userService: UserService,
    private router: Router,
  ) {
    // this.globalEventsManager.showNavBarEmitterLeft.subscribe((showNavBarData)=>{
    //     if (showNavBarData !== null) {
    //       this.showNavBarData = showNavBarData;
    //       if(this.showNavBarData.showNavBar) {
    //         this.sidenav.open()
    //       } else {
    //         this.sidenav.close()
    //       }
    //     }
    // })
  }
  sideNavAction(side: string, showNavBar: boolean, typeObj: string) {
    // this.showNavBarData.showNavBar = showNavBar
    // this.showNavBarData.search.typeObj = typeObj
    // this.globalEventsManager.showNavBarLeft(this.showNavBarData);
  }
  // sidenavOpen(search) {
  //   this.sidenav.open()
  // }

  // test() {
  //   let showNavBarData = {
  //     showNavBar: true,
  //     typeObj: 'project'
  //   }
  //   this.globalEventsManager.showNavBar(showNavBarData);
  // }
  ngOnInit() {
    if (this.authService.isLoggedIn()) {
      // this.showNavBarData.showNavBar = true
      // this.showNavBarData.search.typeObj = 'project'
      // this.globalEventsManager.showNavBarLeft(this.showNavBarData);
      // this.globalEventsManager.showNavBar(true);
      // this.showNavBar = true;
      //let userId = localStorage.getItem('userId');

      this.fetchedUser = this.authService.getCurrentUser()
    }
  }
  // redirect(typeObj) {
  //     // this.router.navigate([typeObj]);
  //
  // }
  // isCurrentUserIsInSubPeriod(){
  //   return this.userService.isCurrentUserIsInSubPeriod()
  // }

  // isCurrentUserIsInSubPeriod(){
  //   // console.log('aa')
  //   //return true;
  //   return this.authService.isCurrentUserIsInSubPeriod()
  // }
  // isCurrentUserHasCompanie(){
  //   // console.log('bb')
  //   // return true;
  //   return this.authService.isCurrentUserHasCompanie()
  // }


  // getUser(id: string) {
  //
  //   this.fetchedUser = this.authService.getCurrentUser()
  //   console.log(this.fetchedUser)
  //   // let this2 = this
  //   // setTimeout(function(){
  //   //     this2.fetchedUser = this2.authService.getCurrentUser()
  //   // }, 2000);
  //
  //   // this.userService.getUser(id)
  //   //   .subscribe(
  //   //     res => { this.fetchedUser = res },
  //   //     error => { console.log(error) }
  //   //   )
  // }

  // isCurrentUserIsInSubPeriod() {
  //   return this.authService.isCurrentUserIsInSubPeriod()
  // }
  // showObjHTML(nameObject) {
  //   return this.authService.showObjHTML(nameObject)
  // }
  // // isCurentUserHasAccess(nameObject, typeAccess) {
  // //   return this.authService.isCurentUserHasAccess(nameObject, typeAccess);
  // // }
  //
  // // check if user is logged in by asking our authentication service, we use this function in html file *ngIf directive
  // isLoggedIn() {
  //   return this.authService.isLoggedIn();
  // }
  //
  // // this calls the logout function from our authentication service, it's activated when user clicks logout in front end.
  // // It's called by the (click)='logout()' when the user presses the button
  // logout() {
  //   this.authService.logout();
  //   let this2 = this
  //   setTimeout(function(){
  //       this2.router.navigate(['/user/login']);
  //   }, 150);
  //
  // }
  // // sideNavOpen(){
  // //   //this.sidenav.open()
  // //   this.sidenav.toggle()
  // // }
  // isAdmin() {
  //   return this.adminService.isAdmin();
  // }
}
