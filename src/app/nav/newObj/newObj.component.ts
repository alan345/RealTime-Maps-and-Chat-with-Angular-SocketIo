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
  selector: 'app-newObj',
  // changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './newObj.component.html',
  styleUrls: ['./newObj.component.css']
})
export class NewObjComponent implements OnInit {
  // @Input() sidenav: any;
  // showNavBar: boolean = false;
 // private userId: string = localStorage.getItem('userId');
  // private userId: string;
  fetchedUser: User = new User();
  fetchedNotifications: Notification[] = [];
  notificationsNotRead: number=0;

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
    // this.globalEventsManager.showNavBarEmitter.subscribe((mode)=>{
    //     // mode will be null the first time it is created, so you need to igonore it when null
    //     if (mode !== null) {
    //       this.showNavBar = mode;
    //       this.fetchedUser = this.authService.getCurrentUser()
    //     }
    // });
  }



  ngOnInit() {
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
  //
  // createProject() {
  //   let newShowNavBarData = new ShowNavBarData()
  //   newShowNavBarData.showNavBar = true
  //   newShowNavBarData.search.typeObj = 'project'
  //   newShowNavBarData.search.userId = ''
  //   this.globalEventsManager.showNavBarRight(newShowNavBarData);
  // }
  // openSideBarLeft(){
  //   let newShowNavBarData = new ShowNavBarData()
  //   newShowNavBarData.showNavBar = true
  //   newShowNavBarData.search.typeObj = ''
  //   this.globalEventsManager.showNavBarLeft(newShowNavBarData)
  // }
  // openMyProfile() {
  //   let newShowNavBarData = new ShowNavBarData()
  //   newShowNavBarData.showNavBar = true
  //   newShowNavBarData.search.typeObj = 'user'
  //   newShowNavBarData.search.userId = this.authService.getCurrentUser()._id
  //   this.globalEventsManager.showNavBarRight(newShowNavBarData)
  // }
  // createUser() {
  //   let newShowNavBarData = new ShowNavBarData()
  //   newShowNavBarData.showNavBar = true
  //   newShowNavBarData.search.typeObj = 'user'
  //   newShowNavBarData.search.isExternalUser = false
  //   this.globalEventsManager.showNavBarRight(newShowNavBarData)
  // }
  // createMission(){
  //   let newShowNavBarData = new ShowNavBarData()
  //   newShowNavBarData.showNavBar = true
  //   newShowNavBarData.search.typeObj = 'mission'
  //   this.globalEventsManager.showNavBarRight(newShowNavBarData)
  // }
  // createDocument(){
  //   let newShowNavBarData = new ShowNavBarData()
  //   newShowNavBarData.showNavBar = true
  //   newShowNavBarData.search.typeObj = 'document'
  //   this.globalEventsManager.showNavBarRight(newShowNavBarData)
  // }
  createNewObj(typeObj: string) {
    let newShowNavBarData = new ShowNavBarData()
    newShowNavBarData.search.typeObj = typeObj
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

  // this calls the logout function from our authentication service, it's activated when user clicks logout in front end.
  // It's called by the (click)='logout()' when the user presses the button
  logout() {
    // this.globalEventsManager.showNavBar(false);


    this.authService.logout();
    let this2 = this
    setTimeout(function(){
        this2.router.navigate(['/user/login']);
    }, 150);

  }
  // sideNavOpen(){
  //   //this.sidenav.open()
  //   this.sidenav.toggle()
  // }
  isAdmin() {
    return this.adminService.isAdmin();
  }
}
