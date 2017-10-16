import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {AuthService} from '../../auth/auth.service';
import {UserCalendarService} from '../userCalendar.service';
import {ProductService} from '../../product/product.service';
// import { ProjectService} from '../../project/project.service';

import {UserCalendar} from '../userCalendar.model';

import {ToastsManager} from 'ng2-toastr';

import {MatDialog } from '@angular/material';
import {Router, ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup} from '@angular/forms';
import { UserService} from '../../user/user.service';

import { DeleteDialog } from '../../deleteDialog/deleteDialog.component';
import { User } from '../../user/user.model';
import { Quote } from '../../quote/quote.model';
import { Product } from '../../product/product.model';
import { Project } from '../../project/project.model';

import { Search } from '../../shared/shared.model';




@Component({
  selector: 'app-userCalendar',
  templateUrl: './userCalendar.component.html',
  styleUrls: ['../userCalendar.component.css'],
})
export class UserCalendarComponent implements OnInit {
  @Input() fetchedUserCalendar:UserCalendar = new UserCalendar()
  @Output() saved: EventEmitter<any> = new EventEmitter();
  search = new Search()
  // fetchedUserCalendar: UserCalendar = new UserCalendar()
  myForm: FormGroup;
  constructor(
    private userCalendarService: UserCalendarService,
    // private projectService: ProjectService,
    private toastr: ToastsManager,
    public dialog: MatDialog,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private location: Location,
    private _fb: FormBuilder,
    private authService: AuthService,

  ) {}
  ngOnChanges() {
    // this.fetchedUserCalendar.users.forEach(client => { this.search.userId = client._id })
    // this.fetchedUserCalendar.assignedTos.forEach(client => { this.search.assignedToId = client._id })
  }
  ngOnInit() {
    this.myForm = this._fb.group({
      title: [''],
      description: [''],
    })

    this.activatedRoute.params.subscribe((params: Params) => {
      if(params['idUserCalendar'])
        this.getUserCalenddar(params['idUserCalendar'])
    })
  }
  selectUser(user: User) {
    // this.fetchedUserCalendar.users.forEach(client => { this.search.userId = client._id })
    // this.fetchedUserCalendar.assignedTos.forEach(client => { this.search.assignedToId = client._id })
    // this.fetchedUserCalendar.users = [user]
  }
  selectProject(project: Project) {
    console.log(project)

    // this.fetchedUserCalendar.clients = project.clients
    // this.fetchedUserCalendar.projects = [project]
  }
  removeProject() {
    // this.fetchedUserCalendar.clients = []
    // this.fetchedUserCalendar.projects.splice(i, 1);
  }
  removeUser() {
    // this.fetchedUserCalendar.users.splice(i, 1);
  }
  getUserCalenddar(id: string) {
    this.userCalendarService.getUserCalendar(id)
      .subscribe(
        res => {
          this.fetchedUserCalendar = res
          // this.fetchedUserCalendar.users.forEach(client => { this.search.userId = client._id })
          // this.fetchedUserCalendar.assignedTos.forEach(client => { this.search.assignedToId = client._id })
        },
        error => {
          console.log(error);
        }
      )
  }


  openDialogDelete() {
    let dialogRefDelete = this.dialog.open(DeleteDialog)
    dialogRefDelete.afterClosed().subscribe(result => {
      if (result) {
        let this2 = this;
        this.onDelete(this.fetchedUserCalendar._id).then(function(){
          this2.saved.emit()
          // this2.router.navigate(['paiementQuote']);
        })

      }
    })
  }

  onDelete(id: string) {
    let this2 = this
    return new Promise(function(resolve, reject) {
      this2.userCalendarService.deleteUserCalendar(id)
        .subscribe(
          res => {
            this2.toastr.success('Great!', res.message);

            resolve(res)
          },
          error => {
            console.log(error);
            reject(error)
          }
        )
      })
  }


    save() {
      // this.fetchedUserCalendar.projects.forEach(project => {
      //   this.fetchedUserCalendar.clients = project.clients
      //   this.fetchedUserCalendar.assignedTos = project.assignedTos
      // })

      if(this.fetchedUserCalendar._id) {
        this.userCalendarService.updateUserCalendar(this.fetchedUserCalendar)
          .subscribe(
            res => {
              this.toastr.success('Great!', res.message)
              this.saved.emit(res)
            },
            error => {
              this.toastr.error('error!', error)
            }
          )
      } else {
        this.userCalendarService.saveUserCalendar(this.fetchedUserCalendar)
          .subscribe(
            res => {
              this.toastr.success('Great!', res.message)
              this.saved.emit(res)
            },
            error => {console.log(error)}
          )
      }
    }
}
