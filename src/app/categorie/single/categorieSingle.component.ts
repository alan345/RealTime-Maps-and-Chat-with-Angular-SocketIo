import { Component, OnInit, Output, EventEmitter} from '@angular/core';
import { CategorieService} from '../categorie.service';
import { CompanieService} from '../../companie/companie.service';

import { ToastsManager} from 'ng2-toastr';
// import { MatDialog } from '@angular/material';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import { Categorie } from '../categorie.model';
import { Companie } from '../../companie/companie.model';
// import { EditOptionsComponentDialog } from '../../form/modalLibrary/modalLibrary.component';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
// import { DeleteDialog } from '../../deleteDialog/deleteDialog.component'
import { UserService } from '../../user/user.service'
import { User } from '../../user/user.model'
import { AuthService} from '../../auth/auth.service';
import {GlobalEventsManager} from '../../globalEventsManager';
import {ShowNavBarData} from '../../home/home.model'



@Component({
  selector: 'app-categorieSingle',
  templateUrl: './categorieSingle.component.html',
  styleUrls: ['../categorie.component.css'],

})

export class CategorieSingleComponent implements OnInit {
  // @Output() saved: EventEmitter<any> = new EventEmitter();
  // selectedIndex0: number = -1
  // selectedIndex1: number = -1
  // selectedIndex2: number = -1
  // selectedIndex1 = 0
  // selectedIndex2 = 0
  // show1 = false
  // show2 = false
  // categ1: string = '';
  // categ2: string = '';
  // categ3: string = '';
  // itemSteps = ItemSteps;


  // autocompleteCompanie: string = '';

  // fetchedCurrentUser: User = new User()



  fetchedCategorie: Categorie = new Categorie();
  fetchedCompanies: Companie[] = []

  //
  // inputCategorie = ''



  public myForm: FormGroup;

  constructor(
    private userService: UserService,
    private sanitizer: DomSanitizer,
    private categorieService: CategorieService,
    private toastr: ToastsManager,
    // public dialog: MatDialog,
    private router: Router,
    private location: Location,
    private activatedRoute: ActivatedRoute,
    private _fb: FormBuilder,
    private companieService: CompanieService,
    private authService: AuthService,
    private globalEventsManager: GlobalEventsManager,
  ) {
  }


  openDeleteConfirmation() {
      let newShowNavBarData = new ShowNavBarData()
      newShowNavBarData.search.typeScreen = 'deleteConfirmation'
      newShowNavBarData.search.typeObj = 'categorie'
      newShowNavBarData.search.categorieId = this.fetchedCategorie._id
      this.globalEventsManager.showNavBarRight(newShowNavBarData)
  }


  ngOnInit() {
    this.myForm = this._fb.group({
        name: ['', [Validators.required, Validators.minLength(2)]],
        description: [''],
        icone: [''],


    })

    // this.getItemSteps();

    this.activatedRoute.params.subscribe((params: Params) => {
      if(params['id'] !== 'new') {
        this.getCategorie(params['id'])
      }
    })

  }


  // getItemSteps() {
  //   let currentUser = this.authService.getCurrentUser()
  //
  //   for (let i in currentUser.ownerCompanies) {
  //     if(currentUser.ownerCompanies[i].categories.categCategorie)
  //       this.itemSteps = currentUser.ownerCompanies[i].categories.categCategorie
  //   }
  //
  // }

  // removePic(i) {
  //   this.fetchedCategorie.forms.splice(i, 1);
  // }
  // changeCascade(selectedIndex1, selectedIndex2) {
  //   this.selectedIndex1 = selectedIndex1
  //   this.selectedIndex2 = selectedIndex2
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

  // openDialogDelete(){
  //   let this2 = this
  //   let dialogRefDelete = this.dialog.open(DeleteDialog)
  //   dialogRefDelete.afterClosed().subscribe(result => {
  //     if(result) {
  //       this.onDelete(this.fetchedCategorie._id).then(function(){
  //         this2.router.navigate(['user']);
  //       })
  //
  //     }
  //   })
  // }


  // goBack() {
  //   this.location.back();
  // }

  // openDialog(positionImage: string) {
  //   // let dialogRef = this.dialog.open(EditOptionsComponentDialog);
  //   // dialogRef.afterClosed().subscribe(result => {
  //   //   if(result) {
  //   //     this.fetchedCategorie.forms.push( result)
  //   //   }
  //   // })
  // }

  // getPicture(result){
  //
  // }
  save() {
    // this.fetchedCategorie.categorie.categ1 = [{name: this.categ1}]
    // this.fetchedCategorie.categorie.categ2 = [{name: this.categ2}]
    // this.fetchedCategorie.categorie.categ3 = [{name: this.categ3}]

    // let categName0 = ''
    // let categName1 = ''
    // let categName2 = ''
    //
    // if(this.selectedIndex0>=0) {categName0 = this.itemSteps[this.selectedIndex0].categ}
    // if(this.selectedIndex1>=0) {categName1 = this.itemSteps[this.selectedIndex0].subCateg[this.selectedIndex1].categ}
    // if(this.selectedIndex2>=0) {categName2 = this.itemSteps[this.selectedIndex0].subCateg[this.selectedIndex1].subCateg[this.selectedIndex2].categ}
    //
    //
    // this.fetchedCategorie.categorie.categ0 = [{name: categName0}]
    // this.fetchedCategorie.categorie.categ1 = [{name: categName1}]
    // this.fetchedCategorie.categorie.categ2 = [{name: categName2}]



    if(this.fetchedCategorie._id) {
      this.categorieService.updateCategorie(this.fetchedCategorie)
        .subscribe(
          res => {
            this.toastr.success('Great!', res.message)
            // this.router.navigate(['categorie']);
            this.getCategorie(res.obj._id)
          },
          error => {console.log(error)}
        );
    } else {
      this.categorieService.saveCategorie(this.fetchedCategorie)
        .subscribe(
          res => {
            this.toastr.success('Great!', res.message)
            this.getCategorie(res.obj._id)
            // this.router.navigate(['categorie']);

          },
          error => {
            this.toastr.error('Error!', error.message)
            console.log(error)
          }
        );
    }
  }




  getCategorie(id: string) {
    this.categorieService.getCategorie(id)
      .subscribe(
        res => {
          this.fetchedCategorie = <Categorie>res
          //
          // let categName0 = ''
          // let categName1 = ''
          // let categName2 = ''
          //
          // if(this.fetchedCategorie.categorie.categ0.length)
          //   categName0 = this.fetchedCategorie.categorie.categ0[0].name
          // if(this.fetchedCategorie.categorie.categ1.length)
          //   categName1 = this.fetchedCategorie.categorie.categ1[0].name
          // if(this.fetchedCategorie.categorie.categ2.length)
          //   categName2 = this.fetchedCategorie.categorie.categ2[0].name
          //
          // this.itemSteps.forEach((categ0, index) => {
          //   if(categ0.categ === categName0)
          //     this.selectedIndex0 = index
          // })
          //
          // if(this.selectedIndex0 >= 0)
          // this.itemSteps[this.selectedIndex0].subCateg.forEach((categ1,index) => {
          //   if(categ1.categ === categName1)
          //     this.selectedIndex1 = index
          // })
          // if(this.selectedIndex1 >= 0)
          // this.itemSteps[this.selectedIndex0].subCateg[this.selectedIndex1].subCateg.forEach((categ2,index) => {
          //   if(categ2.categ === categName2)
          //     this.selectedIndex2 = index
          // })



          // this.categ1 = this.fetchedCategorie.categorie.categ1[0].name
          // this.categ2 = this.fetchedCategorie.categorie.categ2[0].name
          // this.categ3 = this.fetchedCategorie.categorie.categ3[0].name
          //
          // let categ1Index:number = 0
          // let categ2Index:number = 0
          // this.itemSteps.forEach((categ1,index) => {
          //   if(categ1.categ === this.categ1)
          //     categ1Index = index
          // })
          // this.itemSteps[categ1Index].subCateg.forEach((categ2,index) => {
          //   if(categ2.categ === this.categ2)
          //     categ2Index = index
          // })
          // this.changeCascade(categ1Index, categ2Index)
        },
        error => {
          console.log(error);
        }
      )
  }


  onDelete(id: string) {
    let this2 = this
    return new Promise(function(resolve, reject) {
      this2.categorieService.deleteCategorie(id)
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
