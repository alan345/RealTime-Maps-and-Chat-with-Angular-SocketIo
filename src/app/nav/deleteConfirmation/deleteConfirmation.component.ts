import {Component, OnInit, Input} from '@angular/core';
import {AuthService} from '../../auth/auth.service';
import {AdminService} from '../../admin/services/admin.service';
import {Router} from '@angular/router';
import { UserService} from '../../user/user.service';
import { User} from '../../user/user.model';
import { CompanieGuardService} from '../../companie/companieGuard.service'
// import { PaiementGuardService} from '../../user/paiement/paiementGuard.service'
// import { ChangeDetectionStrategy} from '@angular/core';
// import { GlobalEventsManager} from '../../globalEventsManager';
// // import { NotificationService} from '../../notification/notification.service';
// import { Notification} from '../../notification/notification.model';
// import {Observable} from 'rxjs/Rx';
import {ShowNavBarData} from '../../home/home.model'
import {Search} from '../../home/home.model'
import {GlobalEventsManager} from '../../globalEventsManager';
import { ProjectService} from '../../project/project.service';
// import { StratService} from '../../strat/strat.service';
// import { BriefService} from '../../brief/brief.service';
// import { MissionService} from '../../mission/mission.service';
// import { CategorieService} from '../../categorie/categorie.service';
import { DocumentService} from '../../document/document.service';
import { ToastsManager} from 'ng2-toastr';

@Component({
  selector: 'app-deleteConfirmation',
  // changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './deleteConfirmation.component.html',
  styleUrls: ['./deleteConfirmation.component.css']
})
export class DeleteConfirmationComponent implements OnInit {
  @Input() search: Search = new Search()

  // @Input() sidenav: any;
  // showNavBar: boolean = false;
 // private userId: string = localStorage.getItem('userId');
  // private userId: string;
  // fetchedUser: User = new User();
  // fetchedNotifications: Notification[] = [];
  // notificationsNotRead: number=0;

  constructor(
    private projectService: ProjectService,
    // private missionService: MissionService,
    private documentService: DocumentService,
    // private stratService: StratService,
    // private categorieService: CategorieService,
    // private briefService: BriefService,

    // private globalEventsManager: GlobalEventsManager,
    private authService: AuthService,
    private adminService: AdminService,
    private toastr: ToastsManager,
    // private notificationService: NotificationService,
    // private userService: UserService,
    private globalEventsManager: GlobalEventsManager,
    private router: Router,
    // private companieGuardService: CompanieGuardService,
    // private paiementGuardService: PaiementGuardService,
  ) {

  }



  ngOnInit() {
  }

  cancel() {
    const showNavBarData = new ShowNavBarData()
    showNavBarData.showNavBar = false
    // showNavBarData.search.typeObj = 'project'
    // showNavBarData.search.projectId = this.search.projectId
    this.globalEventsManager.showNavBarRight(showNavBarData);
  }
  deleteObject() {
    if(this.search.typeObj === 'project')
      this.projectService.deleteProject(this.search.projectId)
      .subscribe( res => { this.successDeleted(res) }, error => { console.log(error) })

    // if(this.search.typeObj === 'mission')
    //   this.missionService.deleteMission(this.search.missionId)
    //   .subscribe( res => { this.successDeleted(res) }, error => { console.log(error) })

    if(this.search.typeObj === 'document')
      this.documentService.deleteDocument(this.search.documentId)
      .subscribe( res => { this.successDeleted(res) }, error => { console.log(error) })

    // if(this.search.typeObj === 'strat')
    //   this.stratService.deleteStrat(this.search.stratId)
    //   .subscribe( res => { this.successDeleted(res) }, error => { console.log(error) })
    //
    // if(this.search.typeObj === 'brief')
    //   this.briefService.deleteBrief(this.search.briefId)
    //   .subscribe( res => { this.successDeleted(res) }, error => { console.log(error) })
    //
    // if(this.search.typeObj === 'categorie')
    //   this.categorieService.deleteCategorie(this.search.categorieId)
    //   .subscribe( res => { this.successDeleted(res) }, error => { console.log(error) })
  }

  successDeleted(res) {
    this.toastr.success('Great!', res.message);
    let newShowNavBarData = new ShowNavBarData()
    newShowNavBarData.showNavBar = false
    this.globalEventsManager.showNavBarRight(newShowNavBarData)
    if(this.search.typeObj === 'brief') this.router.navigate(['/']);
    if(this.search.typeObj === 'mission') this.router.navigate(['/']);
    if(this.search.typeObj === 'strat') this.router.navigate(['/']);
    if(this.search.typeObj === 'brief') this.router.navigate(['/']);
    if(this.search.typeObj === 'categorie') this.router.navigate(['/']);
    if(this.search.typeObj === 'project') {
      this.router.navigate(['/']);
      this.globalEventsManager.refreshCenter(true);
    }
    if(this.search.typeObj === 'document') this.globalEventsManager.refreshCenter(true);




  }

  // deleteObj(){
  //
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
