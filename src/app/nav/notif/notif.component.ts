import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { AdminService } from '../../admin/services/admin.service';
import { Router } from '@angular/router';
import { UserService } from '../../user/user.service';
import { DocumentService } from '../../document/document.service';
import { User } from '../../user/user.model';
import { Document } from '../../document/document.model';
import { NotifChat } from './notif.model';
import { CompanieGuardService } from '../../companie/companieGuard.service'
// import { PaiementGuardService} from '../../user/paiement/paiementGuard.service'
import { ChangeDetectionStrategy } from '@angular/core';
// import { GlobalEventsManager} from '../../globalEventsManager';
import { ChatService } from '../../chat/chat.service';
// import { Notification} from '../../notification/notification.model';
// import {Observable} from 'rxjs/Rx';
import { ShowNavBarData } from '../../home/home.model'
import { GlobalEventsManager } from '../../globalEventsManager';
import { Search } from '../../home/home.model'


@Component({
  selector: 'app-notif',
  // changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './notif.component.html',
  styleUrls: ['./notif.component.css']
})
export class NotifComponent implements OnInit {
  // @Input() sidenav: any;
  // showNavBar: boolean = false;
  // private userId: string = localStorage.getItem('userId');
  // private userId: string;
  notifChatsInStrats: NotifChat[] = []
  notifChatsInMissions: NotifChat[] = []
  myDocuments: Document[] = []
  newMissionDocs = []
  documentsByMissions = []
  search: Search = new Search()
  // fetchedNotifications: Notification[] = [];
  // notificationsNotRead: number=0;

  constructor(
    private globalEventsManager: GlobalEventsManager,
    private authService: AuthService,
    private adminService: AdminService,
    private chatService: ChatService,
    private documentService: DocumentService,
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

  getChatUnreadInMissions() {
    this.chatService.getChatUnreadInMissions()
      .subscribe(
      res => {
        this.notifChatsInMissions = res.obj
      },
      error => {
        console.log(error);
      }
      );
  }
  getChatUnreadInStrats() {
    this.chatService.getChatUnreadInStrats()
      .subscribe(
      res => {
        this.notifChatsInStrats = res.obj
      },
      error => {
        console.log(error);
      }
      );
  }



getDocumentsByMissions() {
  let search = new Search()
  search.myDocuments = true
  this.documentService.getDocumentsByMissions(search)
    .subscribe(
      res => {
        console.log(res)
        this.documentsByMissions = res
      },
      error => { console.log(error) }
    )

}


getDocumentsInStrats() {
  let search = new Search()
  this.documentService.getDocumentsInStrats(search)
    .subscribe(
      res => {
        console.log(res)
      },
      error => { console.log(error) }
    )
}



  getMyDocuments() {
    let search = { myDocuments: true }
    this.documentService.getDocuments(1, search)
      .subscribe(
      res => {
        console.log(res)
        this.myDocuments = res.data
        // this.myDocuments.forEach(document => {
        //   document.missions.forEach(mission => {
        //     if (!(this.newMissionDocs.some((newMissionDoc, i) => {
        //       if (newMissionDoc.mission._id === mission._id) {
        //         this.newMissionDocs[i].documents.push(document)
        //         return true
        //       }
        //       return false
        //     }
        //     ))) {
        //       let newMissionDoc = {
        //         mission: mission,
        //         documents: [document]
        //       }
        //       this.newMissionDocs.push(newMissionDoc)
        //     }
        //   })
        // })
        // console.log(this.newMissionDocs)
      },
      error => {
        console.log(error);
      }
      );
  }

  ngOnInit() {
    this.getChatUnreadInMissions()
    this.getChatUnreadInStrats()
    this.getMyDocuments()
    this.getDocumentsInStrats()
    this.getDocumentsByMissions()

  }

  goTo(typeObj: string, missionId: string) {

    let newShowNavBarData = new ShowNavBarData()
    newShowNavBarData.showNavBar = false
    this.globalEventsManager.showNavBarRight(newShowNavBarData)

    this.router.navigate([typeObj + '/' + missionId]);
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
  // createNotif(typeObj: string) {
  //   let newShowNavBarData = new ShowNavBarData()
  //   newShowNavBarData.search.typeObj = typeObj
  //   this.globalEventsManager.showNavBarRight(newShowNavBarData)
  // }

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
  // isLoggedIn() {
  //
  //   return this.authService.isLoggedIn();
  // }
  //
  // // this calls the logout function from our authentication service, it's activated when user clicks logout in front end.
  // // It's called by the (click)='logout()' when the user presses the button
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
  // // sideNavOpen(){
  // //   //this.sidenav.open()
  // //   this.sidenav.toggle()
  // // }
  // isAdmin() {
  //   return this.adminService.isAdmin();
  // }
}
