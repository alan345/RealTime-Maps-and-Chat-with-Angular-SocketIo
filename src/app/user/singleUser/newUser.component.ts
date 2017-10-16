import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { AuthService} from '../../auth/auth.service';
import { UserService} from '../user.service';
import { Right} from '../../right/right.model';

import { Companie } from '../../companie/companie.model';
import { CompanieService } from '../../companie/companie.service';
// import { EditOptionsComponentDialog } from '../../form/modalLibrary/modalLibrary.component';
import { ToastsManager} from 'ng2-toastr';

import { MatDialog} from '@angular/material';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Location }               from '@angular/common';
import { User, TypeUser , Address} from '../user.model';
//import { Form } from '../../form/form.model';

import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { DeleteDialog } from '../../deleteDialog/deleteDialog.component'
import { Search } from '../../shared/shared.model';


@Component({
  selector: 'app-newUser',
  templateUrl: './newUser.component.html',
  styleUrls: ['../user.component.css'],

})

export class NewUserComponent implements OnInit {
  @Output() saved: EventEmitter<any> = new EventEmitter();
  @Input() search: Search = new Search()

  fetchedCompanies: Companie[] = []
  autocompleteCompanie: string = '';

  fetchedTypeUsers = []
  autocompleteTypeUser: string = '';

  // fetchedRights: Right[] = []

  titleArray=['Mr.', 'Mrs.']
  languageArray=['fr','en']
  typeClientArray=['Particulier','Societe','Administration']
  statusHouseArray=['Propriétaire','Locataire']
  typeHouseArray=['','Pavillon','Immeuble']
  accessTypeArray=['','escalier', 'ascenseur']
  sourceContactArray=['','Adwords','Appel Entrant', 'Apporteur Affaire']
  companieIndexToSelect = ''
  typeUserDropDown = ''
  typeUser = TypeUser


  fetchedUser: User = new User();
  currentUser: User = new User();
  showProjects: boolean = false;
  places = []

  public myForm: FormGroup;

  constructor(
    private userService: UserService,
    private toastr: ToastsManager,
    public dialog: MatDialog,
    private router: Router,
    private location: Location,
    private activatedRoute: ActivatedRoute,
    private _fb: FormBuilder,
    private authService: AuthService,
    private companieService: CompanieService,
  ) {
  }

    selectCity(i, city: string){
      this.fetchedUser.profile.address[i].city = city
      this.fetchedUser.profile.address[i].cities = []
      // this.places = []
    }
    searchCities(zip, i) {
      if(zip.length > 4)
        this.userService.getCityByZip(zip)
          .subscribe(
            res => {
              this.fetchedUser.profile.address[i].cities = res.places
              // console.log(this.places)
            },
            error => {
              console.log(error);
            }
          )
    }
    ngOnInit() {
      // this.authService.getCurrentUser().ownerCompanies.forEach((companie, i) => {
      //   if(companie.typeUsers.length)
      //     this.fetchedUser.typeUsers.push(companie.typeUsers[0].value)
      // })


      this.currentUser = this.authService.getCurrentUser()
      this.myForm = this._fb.group({
          email: ['', [Validators.required, Validators.minLength(3)]],
          typeUsers: [''],
          language: [''],
          colorCalendar: [''],
          otherData: [''],
          name: [''],
          lastName: ['', [Validators.required, Validators.minLength(3)]],
          phoneNumber: [''],
          fax: [''],
          title: ['', [Validators.required, Validators.minLength(1)]],
          typeClient: [''],
          statusHouse: [''],
          sourceContact: [''],

          typeHouse: [''],
          surface: [''],
          accesCode: [''],
          floor: [''],
          accessType: [''],


          address: [''],
          city: [''],
          state: [''],
          zip: [''],


      })

      this.fetchedUser.isExternalUser = this.search.isExternalUser
      this.activatedRoute.params.subscribe((params: Params) => {
        if(params['id']) {
          this.getUser(params['id'])

          this.search.userId = params['id']
          console.log(this.search)
        } else {
          if(params['isExternalUser'] === 'false') {
            this.fetchedUser.isExternalUser = false
          }
        }

      })
    }
  //
  // searchCompanies() {
  //   if(!this.autocompleteCompanie) {
  //     this.fetchedCompanies = []
  //   } else {
  //     let search = {
  //         search: this.autocompleteCompanie,
  //       };
  //     this.getCompanies(1, search)
  //   }
  // }

  // getCompanies(page: number, search: any) {
  //   this.companieService.getCompanies(page, search)
  //     .subscribe(
  //       res => {
  //         this.fetchedCompanies = res.data
  //       },
  //       error => {
  //         console.log(error);
  //       }
  //     );
  // }
              // selectCompanie(companie: Companie) {
              //   this.fetchedUser.ownerCompanies = [companie]
              // }
  newAddress() {
    let newAddress = new Address()
    this.fetchedUser.profile.address.push(newAddress)
  }
  removeAddress(i) {
    this.fetchedUser.profile.address.splice(i, 1);
  }
  selectRight(right: Right) {
    this.fetchedUser.rights = [right]
  }

  selectOwnerCompanies(companie: Companie) {
    this.fetchedUser.ownerCompanies = [companie]
  }

  selectSalesMan(users) {
    this.fetchedUser.salesMan = users
  }
  getPicture(result){
    console.log(result)
  }

  // openDialog(positionImage: string) {
  //   // let dialogRef = this.dialog.open(EditOptionsComponentDialog);
  //   // dialogRef.afterClosed().subscribe(result => {
  //   //   if(result) {
  //   //     this.fetchedUser.profile.profilePicture.push(result)
  //   //   }
  //   // })
  // }
  // removePic(i) {
  //   this.fetchedUser.profile.profilePicture.splice(i, 1);
  // }

  // autocolplete typeUser
  searchTypeUser() {
    if(!this.autocompleteTypeUser) {
      this.fetchedTypeUsers = []
    } else {
      this.fetchedTypeUsers = this.typeUser.filter((el) =>
        el.toLowerCase().indexOf(this.autocompleteTypeUser.toLowerCase()) > -1
      );
    }
  }
  selectTypeUser(typeUser) {
    this.autocompleteTypeUser = '';
    this.fetchedTypeUsers = [];
    this.fetchedUser.typeUsers.push(typeUser);
  }
  removeTypeUser(i: number) {
    this.fetchedUser.typeUsers.splice(i, 1);
  }
  // autocolplete typeUser






  emailValidator(control: any) {
    let EMAIL_REGEXP = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;

    if (!EMAIL_REGEXP.test(control.value)) {
      return {invalidEmail: true};
    }
  }

  goBack() {
    this.location.back();
  }

  openDialogDelete(){
    let this2 = this
    let dialogRefDelete = this.dialog.open(DeleteDialog)
    dialogRefDelete.afterClosed().subscribe(result => {
      if(result) {
        this.onDelete(this.fetchedUser._id).then(function(){
          this2.router.navigate(['user']);
        })

      }
    })
  }

  saveAndCreateProject() {
    this.save()
    this.router.navigate(['project/new/' + this.fetchedUser._id])
  }

  save() {
    // this.userService.cleanCurrentUserInSession()
    //console.log(this.typeUserDropDown)
    //this.fetchedUser.type = [this.typeUserDropDown]
    if(this.fetchedUser._id) {
      this.userService.updateUser(this.fetchedUser)
        .subscribe(
          res => {
            this.toastr.success('Great!', res.message)
            // location.reload();
            // if(redirect == 'profile')
            //   this.router.navigate(['user/profile/' + res.obj._id])
            // if(redirect == 'project')
            //   this.router.navigate(['project/new/' + res.obj._id])
          },
          error => {
            this.toastr.error('Error!')
            console.log(error)
          }
        )
    } else {
      this.userService.saveUser(this.fetchedUser)
        .subscribe(
          res => {
            this.toastr.success('Great!', res.message)
            this.fetchedUser = res.obj
            this.saved.emit(res.obj)
            // if(redirect == 'profile')
            // this.router.navigate(['user/newuser/' + res.obj._id])
            // location.reload();
            // if(redirect == 'project')
            //   this.router.navigate(['project/new/' + res.obj._id])
            // this.addUserIdToCompanie(res.obj)
            //this.router.navigate(['user'])
          },
          error => {
            console.log(error)
            this.toastr.error('Error!')
          }
        );
    }
  }


  navigate(id: string){
    this.router.navigate(['user/' + id])
  }

isUserIsMyself() {
  if(this.currentUser._id === this.fetchedUser._id)
    return true
  return false
}


  getUser(id: string) {
    this.userService.getUser(id)
      .subscribe(
        res => {
          this.fetchedUser = res
          this.fetchedUser.typeUsers.forEach(type => {
            this.typeUserDropDown = type
          });
        },
        error => {
          console.log(error);
        }
      )
  }


  onDelete(id: string) {
    let this2 = this
    return new Promise(function(resolve, reject) {
      this2.userService.deleteUser(id)
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

}
