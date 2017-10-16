import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../auth/auth.service';
import {NotificationService} from '../notification.service';
import {UserService} from '../../user/user.service';
import {Notification} from '../notification.model';

import {ToastsManager} from 'ng2-toastr';

import {MatDialog } from '@angular/material';
import {Router, ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';

// import { DeleteDialog } from '../../deleteDialog/deleteDialog.component';
// import { User } from '../../user/user.model';

// import { EditOptionsComponentDialog } from '../../form/modalLibrary/modalLibrary.component';

@Component({
  selector: 'app-editNotification',
  templateUrl: './notification.component.html',
  styleUrls: ['../notification.component.css'],
})
export class NotificationComponent implements OnInit {
  fetchedNotification: Notification = new Notification()

  // userAdmins : User[] = []
  // userManagers : User[] = []
  // userClients : User[] = []
  // usersSalesRep : User[] = []
  // userStylists : User[] = []
  myForm: FormGroup;
  seeNotifications = false;
  seeCategProject = false;
  seeCategProduct = false;
  typesNotifications = [
    {name : 'Project', value: 'project'},
    {name : 'Product', value: 'product'},
    {name : 'Quote', value: 'quote'},
    {name : 'Reporting', value: 'reporting'},
    {name : 'Companie', value: 'companie'},
    {name : 'User', value: 'user'},
    {name : 'Paiement', value: 'paiementQuote'},
    {name : 'Task', value: 'task'},
    {name : 'userCalendar', value: 'userCalendar'},
    {name : 'Plan', value: 'plan'},
    {name : 'Notification', value: 'notification'},
    {name : 'Expense', value: 'expense'},

  ]
  constructor(
    private notificationService: NotificationService,
//    private modalService: NgbModal,
    private toastr: ToastsManager,
    public dialog: MatDialog,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private location: Location,
    private _fb: FormBuilder,
    private authService:AuthService,
    private userService:UserService
  ) {}

  ngOnInit() {
    this.myForm = this._fb.group({
      nameNotification: ['', [Validators.minLength(1)]],

    })

    this.activatedRoute.params.subscribe((params: Params) => {
      if(params['id']) {
        this.getNotification(params['id'])
      }
    })
  }




  save() {
    //this.fetchedNotification.categJson.categProduct = JSON.stringify(JSON.parse(this.fetchedNotification.categJson.categProduct))
    if(this.fetchedNotification._id) {
      this.notificationService.updateNotification(this.fetchedNotification)
        .subscribe(
          res => {
            this.toastr.success('Great!', res.message)
          //  this.router.navigate(['notification/' + this.fetchedNotification._id])
          },
          error => {
            this.toastr.error('error!', error)
          }
        )
    } else {
      this.notificationService.saveNotification(this.fetchedNotification)
        .subscribe(
          res => {
            this.toastr.success('Great!', res.message)
            this.fetchedNotification = res.obj
            //  this.router.navigate(['notification/' + res.obj._id])
          },
          error => {console.log(error)}
        )
    }
  }
  selectUser() {
  }
  selectProject() {
  }
  selectQuote() {
  }
//
// saveToMyNotification(){
//   this.notificationService.saveNotification(this.fetchedNotification)
//     .subscribe(
//       res => {
//         this.userService.addNotificationToMyself(res.obj)
//           .subscribe(
//             res => {
//               // this.userService.cleanCurrentUserInSession()
//               location.reload();
//               this.toastr.success('Great!', res.message)
//             },
//             error => {console.log(error)}
//           )
//         this.toastr.success('Great!', res.message)
//       },
//       error => {console.log(error)}
//     )
// }
  // move(i: number, incremet: number, typeUser: string) {
  //   if(i>=0 && i<=this[typeUser].length + incremet) {
  //     var tmp = this[typeUser][i];
  //     this[typeUser][i] = this[typeUser][i + incremet]
  //     this[typeUser][i + incremet] = tmp
  //     this.save()
  //   }
  // }


  onDelete(id: string) {
    this.notificationService.deleteNotification(id)
      .subscribe(
        res => {
          this.toastr.success('Great!', res.message);
          this.router.navigate(['notification/'])
          console.log(res);
        },
        error => {
          console.log(error);
        }
      );
  }

  goBack() {
    this.location.back();
  }



  getNotification(id: string) {
    this.notificationService.getNotification(id, {})
      .subscribe(
        res => {
          this.fetchedNotification = res
        },
        error => {
          console.log(error);
        }
      )
  }
  isAdmin() {
    return this.authService.isAdmin();
  }


}
