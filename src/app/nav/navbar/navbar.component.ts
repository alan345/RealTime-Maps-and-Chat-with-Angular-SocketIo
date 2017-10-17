import {Component, OnInit, Input} from '@angular/core';
import {AuthService} from '../../auth/auth.service';
import {AdminService} from '../../admin/services/admin.service';
import {Router} from '@angular/router';
import { UserService} from '../../user/user.service';
import { User} from '../../user/user.model';
import { CompanieGuardService} from '../../companie/companieGuard.service'
// import { PaiementGuardService} from '../../user/paiement/paiementGuard.service'
import { ChangeDetectionStrategy} from '@angular/core';
// import { GlobalEventsManager} from '../../globalEventsManager';
// // import { NotificationService} from '../../notification/notification.service';
// import { Notification} from '../../notification/notification.model';
// import {Observable} from 'rxjs/Rx';
import {ShowNavBarData} from '../../home/home.model'

import {GlobalEventsManager} from '../../globalEventsManager';

@Component({
  selector: 'app-navbar',
  // changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  // @Input() sidenav: any;
  // showNavBar: boolean = false;
 // private userId: string = localStorage.getItem('userId');
  // private userId: string;
  fetchedCurrentUser: User = new User();
  fetchedNotifications: Notification[] = [];
  notificationsNotRead: number=0;
  showNavBarData: ShowNavBarData = new ShowNavBarData()
  topNavOpen: boolean = false

  constructor(
    // private globalEventsManager: GlobalEventsManager,
    private authService: AuthService,
    private adminService: AdminService,
    // private notificationService: NotificationService,
    // private userService: UserService,
    private globalEventsManager: GlobalEventsManager,
    private router: Router,
    // private companieGuardService: CompanieGuardService,
    // private paiementGuardService: PaiementGuardService,
  ) {
    this.globalEventsManager.showNavBarEmitterTop.subscribe((showNavBarData)=>{
        if (showNavBarData !== null) {
          this.showNavBarData = showNavBarData;
          if(this.showNavBarData.showNavBar) {
            this.topNavOpen = true
            this.fetchedCurrentUser = this.authService.getCurrentUser()
          } else {
            this.topNavOpen = false
          }
        }
    })
  }



  ngOnInit() {

    if (this.authService.isLoggedIn()) {
      // this.fetchedCurrentUser = this.authService.getCurrentUser()
      this.showNavBarData.showNavBar = true
      this.globalEventsManager.showNavBarTop(this.showNavBarData);

    }

    // if (this.authService.isLoggedIn()) {
    //   //let userId = localStorage.getItem('userId');
    //
    //   this.getNotifications(1, {})
    //   Observable.interval(1000 * 30).subscribe(x => {
    //     this.getNotifications(1, {})
    //   });
    //
    //   this.globalEventsManager.showNavBar(true);
    //   this.showNavBar = true;
    //   this.fetchedUser = this.authService.getCurrentUser()
    // }
  }

  createProject() {
    let newShowNavBarData = new ShowNavBarData()
    newShowNavBarData.search.typeObj = 'project'
    newShowNavBarData.search.userId = ''
    this.globalEventsManager.showNavBarRight(newShowNavBarData);
  }
  openSideBarLeft() {
    let newShowNavBarData = new ShowNavBarData()
    newShowNavBarData.search.typeObj = 'project'
    this.globalEventsManager.showNavBarLeft(newShowNavBarData)
  }
  openMyProfile() {
    let newShowNavBarData = new ShowNavBarData()
    newShowNavBarData.search.typeObj = 'user'
    newShowNavBarData.search.typeScreen = 'profile'
    newShowNavBarData.search.userId = this.authService.getCurrentUser()._id
    this.globalEventsManager.showNavBarRight(newShowNavBarData)
  }
  createUser() {
    let newShowNavBarData = new ShowNavBarData()
    newShowNavBarData.search.typeObj = 'user'
    newShowNavBarData.search.isExternalUser = false
    this.globalEventsManager.showNavBarRight(newShowNavBarData)
  }
  createMission(){
    let newShowNavBarData = new ShowNavBarData()
    newShowNavBarData.search.typeObj = 'mission'
    this.globalEventsManager.showNavBarRight(newShowNavBarData)
  }
  newObj(){
    let newShowNavBarData = new ShowNavBarData()
    newShowNavBarData.search.typeObj = 'newObj'
    this.globalEventsManager.showNavBarRight(newShowNavBarData)
  }
  notif(){
    let newShowNavBarData = new ShowNavBarData()
    newShowNavBarData.search.typeObj = 'notif'
    this.globalEventsManager.showNavBarRight(newShowNavBarData)
  }

  // cleanNotifications() {
  //   // this.notificationsNotRead = 0
  // }
  // getNotifications(page: number, search: any) {
  //   // this.notificationService.getNotifications(page, search)
  //   //   .subscribe(
  //   //     res => {
  //   //       this.fetchedNotifications =  res.data
  //   //       this.notificationsNotRead = 0
  //   //       this.fetchedNotifications.forEach(notif=> {
  //   //         if(notif.isRead === false) {
  //   //           this.notificationsNotRead++
  //   //         }
  //   //       })
  //   //     },
  //   //     error => {
  //   //       console.log(error);
  //   //     }
  //   //   );
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
  // isCurentUserHasAccess(nameObject, typeAccess) {
  //   return this.authService.isCurentUserHasAccess(nameObject, typeAccess);
  // }

  // check if user is logged in by asking our authentication service, we use this function in html file *ngIf directive
  isLoggedIn() {

    return this.authService.isLoggedIn();
  }

  goHome() {
    this.router.navigate(['/']);
    let newShowNavBarData = new ShowNavBarData()
    newShowNavBarData.search.typeObj = 'project'
    this.globalEventsManager.showNavBarLeft(newShowNavBarData);
  }

  openProfile() {
    let showNavBarData = new ShowNavBarData()
    showNavBarData.search.typeScreen = 'profile'
    showNavBarData.search.typeObj = 'user'
    showNavBarData.search.userId = this.authService.getCurrentUser()._id
    this.globalEventsManager.showNavBarRight(showNavBarData);
  }

  // logout() {
  //   // this.globalEventsManager.showNavBar(false);
  //
  //
  //   this.authService.logout();
  //   let this2 = this
  //   setTimeout(function(){
  //       this2.router.navigate(['/user/login']);
  //   }, 150);
  //
  // }
  // sideNavOpen(){
  //   //this.sidenav.open()
  //   this.sidenav.toggle()
  // }
  isAdmin() {
    return this.adminService.isAdmin();
  }
}
