import { Component, OnInit, Output, EventEmitter} from '@angular/core';
import { ProductService} from '../product.service';
import { CompanieService} from '../../companie/companie.service';

import { ToastsManager} from 'ng2-toastr';
import { MatDialog } from '@angular/material';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import { Product, ItemSteps } from '../product.model';
import { Companie } from '../../companie/companie.model';
// import { EditOptionsComponentDialog } from '../../form/modalLibrary/modalLibrary.component';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { DeleteDialog } from '../../deleteDialog/deleteDialog.component'
import { UserService } from '../../user/user.service'
import { User } from '../../user/user.model'
import { ModelVATs } from '../../quote/quote.model'
import { AuthService} from '../../auth/auth.service';


@Component({
  selector: 'app-productSingle',
  templateUrl: './productSingle.component.html',
  styleUrls: ['../product.component.css'],

})

export class ProductSingleComponent implements OnInit {
  @Output() saved: EventEmitter<any> = new EventEmitter();
  selectedIndex0: number = -1
  selectedIndex1: number = -1
  selectedIndex2: number = -1
  // selectedIndex1 = 0
  // selectedIndex2 = 0
  show1 = false
  show2 = false
  // categ1: string = '';
  // categ2: string = '';
  // categ3: string = '';
  itemSteps = ItemSteps;

  VATs = ModelVATs

  autocompleteCompanie: string = '';

  // fetchedCurrentUser: User = new User()



  fetchedProduct: Product = new Product();
  fetchedCompanies: Companie[] = []

  //
  // inputCategorie = ''



  public myForm: FormGroup;

  constructor(
    private userService: UserService,
    private sanitizer: DomSanitizer,
    private productService: ProductService,
    private toastr: ToastsManager,
    public dialog: MatDialog,
    private router: Router,
    private location: Location,
    private activatedRoute: ActivatedRoute,
    private _fb: FormBuilder,
    private companieService: CompanieService,
    private authService: AuthService,
  ) {
  }




  ngOnInit() {
    this.myForm = this._fb.group({


        referenceName: ['', [Validators.required, Validators.minLength(2)]],
        reference: ['', [Validators.required, Validators.minLength(2)]],
        description: [''],
        unit: [''],

        costPrice: [''],
        sellingPrice: [''],
        vat: [],

        height: [''],
        width: [''],
        depth: [''],


    })

    this.getItemSteps();

    this.activatedRoute.params.subscribe((params: Params) => {
      if(params['id']) {
        this.getProduct(params['id'])
      }
    })

  }


  getItemSteps() {
    let currentUser = this.authService.getCurrentUser()

    for (let i in currentUser.ownerCompanies) {
      if(currentUser.ownerCompanies[i].categories.categProduct)
        this.itemSteps = currentUser.ownerCompanies[i].categories.categProduct
    }

  }

  // removePic(i) {
  //   this.fetchedProduct.forms.splice(i, 1);
  // }
  // changeCascade(selectedIndex1, selectedIndex2) {
  //   this.selectedIndex1 = selectedIndex1
  //   this.selectedIndex2 = selectedIndex2
  // }
  changeCascade(selectedIndex0, selectedIndex1, selectedIndex2) {
    this.selectedIndex0 = selectedIndex0
    this.selectedIndex1 = selectedIndex1
    this.selectedIndex2 = selectedIndex2
  }


  searchCompanies() {
    if(!this.autocompleteCompanie) {
      this.fetchedCompanies = []
    } else {
      let search = {
          search: this.autocompleteCompanie,
        };
      this.getCompanies(1, search)
    }
  }


  selectCompanie(companie: Companie) {
    this.fetchedProduct.vendors = [companie]
  }

  removeCompanie(i: number) {
    this.fetchedProduct.vendors.splice(i, 1);
  }

  getCompanies(page: number, search: any) {
    this.companieService.getCompanies(page, search)
      .subscribe(
        res => {
          this.fetchedCompanies = res.data
        },
        error => {
          console.log(error);
        }
      );
  }

  openDialogDelete(){
    let this2 = this
    let dialogRefDelete = this.dialog.open(DeleteDialog)
    dialogRefDelete.afterClosed().subscribe(result => {
      if(result) {
        this.onDelete(this.fetchedProduct._id).then(function(){
          this2.router.navigate(['user']);
        })

      }
    })
  }


  // goBack() {
  //   this.location.back();
  // }

  // openDialog(positionImage: string) {
  //   // let dialogRef = this.dialog.open(EditOptionsComponentDialog);
  //   // dialogRef.afterClosed().subscribe(result => {
  //   //   if(result) {
  //   //     this.fetchedProduct.forms.push( result)
  //   //   }
  //   // })
  // }

  getPicture(result){

  }
  save() {
    // this.fetchedProduct.categorie.categ1 = [{name: this.categ1}]
    // this.fetchedProduct.categorie.categ2 = [{name: this.categ2}]
    // this.fetchedProduct.categorie.categ3 = [{name: this.categ3}]

    let categName0 = ''
    let categName1 = ''
    let categName2 = ''

    if(this.selectedIndex0>=0) {categName0 = this.itemSteps[this.selectedIndex0].categ}
    if(this.selectedIndex1>=0) {categName1 = this.itemSteps[this.selectedIndex0].subCateg[this.selectedIndex1].categ}
    if(this.selectedIndex2>=0) {categName2 = this.itemSteps[this.selectedIndex0].subCateg[this.selectedIndex1].subCateg[this.selectedIndex2].categ}


    this.fetchedProduct.categorie.categ0 = [{name: categName0}]
    this.fetchedProduct.categorie.categ1 = [{name: categName1}]
    this.fetchedProduct.categorie.categ2 = [{name: categName2}]



    if(this.fetchedProduct._id) {
      this.productService.updateProduct(this.fetchedProduct)
        .subscribe(
          res => {
            this.toastr.success('Great!', res.message)
            // this.router.navigate(['product']);
            this.getProduct(res.obj._id)
            this.saved.emit(res.obj)
          },
          error => {console.log(error)}
        );
    } else {
      this.productService.saveProduct(this.fetchedProduct)
        .subscribe(
          res => {
            this.toastr.success('Great!', res.message)
            this.getProduct(res.obj._id)
            // this.router.navigate(['product']);
            this.saved.emit(res.obj)
          },
          error => {
            this.toastr.error('Error!', error.message)
            console.log(error)
          }
        );
    }
  }




  getProduct(id: string) {
    this.productService.getProduct(id)
      .subscribe(
        res => {
          this.fetchedProduct = <Product>res

          let categName0 = ''
          let categName1 = ''
          let categName2 = ''

          if(this.fetchedProduct.categorie.categ0.length)
            categName0 = this.fetchedProduct.categorie.categ0[0].name
          if(this.fetchedProduct.categorie.categ1.length)
            categName1 = this.fetchedProduct.categorie.categ1[0].name
          if(this.fetchedProduct.categorie.categ2.length)
            categName2 = this.fetchedProduct.categorie.categ2[0].name

          this.itemSteps.forEach((categ0, index) => {
            if(categ0.categ === categName0)
              this.selectedIndex0 = index
          })

          if(this.selectedIndex0 >= 0)
          this.itemSteps[this.selectedIndex0].subCateg.forEach((categ1,index) => {
            if(categ1.categ === categName1)
              this.selectedIndex1 = index
          })
          if(this.selectedIndex1 >= 0)
          this.itemSteps[this.selectedIndex0].subCateg[this.selectedIndex1].subCateg.forEach((categ2,index) => {
            if(categ2.categ === categName2)
              this.selectedIndex2 = index
          })



          // this.categ1 = this.fetchedProduct.categorie.categ1[0].name
          // this.categ2 = this.fetchedProduct.categorie.categ2[0].name
          // this.categ3 = this.fetchedProduct.categorie.categ3[0].name
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
      this2.productService.deleteProduct(id)
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
