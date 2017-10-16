import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../auth/auth.service';
import {RightService} from '../right.service';
import {UserService} from '../../user/user.service';



import {Right, Permission, Access} from '../right.model';

import {ToastsManager} from 'ng2-toastr';

import {MatDialog } from '@angular/material';
import {Router, ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';

import { DeleteDialog } from '../../deleteDialog/deleteDialog.component';
import { User } from '../../user/user.model';

// import { EditOptionsComponentDialog } from '../../form/modalLibrary/modalLibrary.component';

@Component({
  selector: 'app-editRight',
  templateUrl: './right.component.html',
  styleUrls: ['../right.component.css'],
})
export class RightComponent implements OnInit {
  fetchedRight: Right = new Right()

  // userAdmins : User[] = []
  // userManagers : User[] = []
  // userClients : User[] = []
  // usersSalesRep : User[] = []
  // userStylists : User[] = []
  myForm: FormGroup;
  seeRights = false;
  seeCategProject = false;
  seeCategProduct = false;
  typesRights = [
    {name : 'Project', value: 'project', typeAccess:
      [{value:'read',name:'Read'},{value:'write',name:'Write'},{value:'notification',name:'Get notification'}]},
    {name : 'Product', value: 'product', typeAccess:
      [{value:'read',name:'Read'},{value:'write',name:'Write'},{value:'notification',name:'Get notification'}]},
    {name : 'Quote', value: 'quote', typeAccess:
      [{value:'read',name:'Read'},{value:'write',name:'Write'},{value:'notification',name:'Get notification'}]},
    {name : 'Reporting', value: 'reporting', typeAccess:
      [{value:'read',name:'Read'},{value:'write',name:'Write'},{value:'notification',name:'Get notification'}]},
    {name : 'Companie', value: 'companie', typeAccess:
      [{value:'read',name:'Read'},{value:'write',name:'Write'},{value:'notification',name:'Get notification'}]},
    {name : 'User', value: 'user', typeAccess:
      [{value:'read',name:'Read'},{value:'write',name:'Write'},{value:'notification',name:'Get notification'}]},
    {name : 'Paiement', value: 'paiementQuote', typeAccess:
      [{value:'read',name:'Read'},{value:'write',name:'Write'},{value:'notification',name:'Get notification'}]},
    {name : 'Task', value: 'task', typeAccess:
      [{value:'read',name:'Read'},{value:'write',name:'Write'},{value:'notification',name:'Get notification'}]},
    {name : 'userCalendar', value: 'userCalendar', typeAccess:
      [{value:'read',name:'Read'},{value:'write',name:'Write'},{value:'notification',name:'Get notification'}]},
    {name : 'Plan', value: 'plan', typeAccess:
      [{value:'read',name:'Read'},{value:'write',name:'Write'},{value:'notification',name:'Get notification'}]},
    {name : 'Right', value: 'right', typeAccess:
      [{value:'read',name:'Read'},{value:'write',name:'Write'},{value:'notification',name:'Get notification'}]},
    {name : 'Expense', value: 'expense', typeAccess:
      [{value:'read',name:'Read'},{value:'write',name:'Write'},{value:'notification',name:'Get notification'}]},
    {name : 'Comment', value: 'comment', typeAccess:
      [{value:'read',name:'Read'},{value:'write',name:'Write'}]},

  ]
  constructor(
    private rightService: RightService,
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
      name: ['', [Validators.required, Validators.minLength(2)]],
      phoneNumber: ['', [Validators.required, Validators.minLength(2)]],
      categJson: this._fb.group({
        categProduct: [''],
        categProject: ['']
      }),
      option: this._fb.group({
        calendar: this._fb.group({
          timeBegin: ['', [Validators.required, Validators.minLength(1)]],
          timeEnd: ['', [Validators.required, Validators.minLength(1)]],
        }),
      }),
      address: this._fb.group({
        address: [''],
        city: [''],
        state: [''],
        zip: [''],
      }),
      _users: this._fb.array([])
    })

    this.getCurrentUser()
    this.activatedRoute.params.subscribe((params: Params) => {
      if(params['id']) {
        if(params['id'] === 'mine') {
          this.getRight('')
        } else {
          this.getRight(params['id'])
        }
      }
    })
  }
  setAllRights() {
    this.fetchedRight.detailRight.permissions = []
    this.typesRights.forEach(typesRight => {
      let newPermission = new Permission()
      newPermission.namePermission = typesRight.value
      typesRight.typeAccess.forEach(typeAccessSingle => {
        let newAccess = new Access()
        newAccess.typeAccess = typeAccessSingle.value
        newPermission.access.push(newAccess)
      })
      this.fetchedRight.detailRight.permissions.push(newPermission)
    })
  }
  removeRight(level, index1, index2, index3) {
    // console.log(level)
      if(level === 2)
        this.fetchedRight.detailRight.permissions.splice(index2, 1)
      if(level === 3)
        this.fetchedRight.detailRight.permissions[index2].access.splice(index3, 1)
      // if(level === 3)
        // this.fetchedRight.detailRight[index1].permissions[index1].access.splice(index2, 1)
      // if(level === 3)
      //   this.fetchedCompanie.rights[index1].permissions[index1].access[index2].subCateg.splice(index3, 1)
  }
  addRight(level, index1, index2, index3) {

      if(level === 1){
        let newRight = new Permission()
        this.fetchedRight.detailRight.permissions.unshift(newRight)
      }
      if(level === 2){

        let newRight = new Access()
        this.fetchedRight.detailRight.permissions[index2].access.unshift(newRight)
      }
  }

  openSection(nameSection){
    this[nameSection] = !this[nameSection]
  }

  // removeRight(level, index1, index2, index3) {
  //     if(level === 0)
  //       this.fetchedRight.rights.splice(level, 1)
  //     if(level === 1)
  //       this.fetchedRight.rights.splice(index1, 1)
  //     if(level === 2)
  //       this.fetchedRight.rights[index1].permissions.splice(index1, 1)
  //     if(level === 3)
  //       this.fetchedRight.rights[index1].permissions[index1].access.splice(index2, 1)
  //     // if(level === 3)
  //     //   this.fetchedRight.rights[index1].permissions[index1].access[index2].subCateg.splice(index3, 1)
  // }



  fetchedCurrentUser: User = new User()
  getCurrentUser() {
    this.userService.getUser('')
      .subscribe(
        res => { this.fetchedCurrentUser = res },
        error => { console.log(error) }
      )
  }








  save() {

    //this.fetchedRight.categJson.categProduct = JSON.stringify(JSON.parse(this.fetchedRight.categJson.categProduct))
    if(this.fetchedRight._id) {
      this.rightService.updateRight(this.fetchedRight)
        .subscribe(
          res => {
            this.toastr.success('Great!', res.message)
          //  this.router.navigate(['right/' + this.fetchedRight._id])
          },
          error => {
            this.toastr.error('error!', error)
          }
        )
    } else {
      this.rightService.saveRight(this.fetchedRight)
        .subscribe(
          res => {
            this.toastr.success('Great!', res.message)
            this.fetchedRight = res.obj
            //  this.router.navigate(['right/' + res.obj._id])
          },
          error => {console.log(error)}
        )
    }
  }

//
// saveToMyRight(){
//   this.rightService.saveRight(this.fetchedRight)
//     .subscribe(
//       res => {
//         this.userService.addRightToMyself(res.obj)
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
    this.rightService.deleteRight(id)
      .subscribe(
        res => {
          this.toastr.success('Great!', res.message);
          this.router.navigate(['right/'])
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



  getRight(id: string) {
    this.rightService.getRight(id, {})
      .subscribe(
        res => {
          this.fetchedRight = res
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
