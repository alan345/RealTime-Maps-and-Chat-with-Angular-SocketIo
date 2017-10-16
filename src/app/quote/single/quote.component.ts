import {Component, OnInit, ViewChild, Input, Output, EventEmitter} from '@angular/core';
import {AuthService} from '../../auth/auth.service';
import {QuoteService} from '../quote.service';
import {TemplateQuoteService} from '../templateQuote.service';

import { DragulaService } from 'ng2-dragula';
import {ProductService} from '../../product/product.service';
import { ProjectService} from '../../project/project.service';

import {Quote, DevisDetail, BucketProduct, StatusQuotes, Signature, PriceQuoteTaxe, ModelVATs } from '../quote.model';
import {TemplateQuote } from '../templateQuote.model';

import {ToastsManager} from 'ng2-toastr';

import {MatDialog } from '@angular/material';
import {Router, ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { UserService} from '../../user/user.service';
import { DeleteDialog } from '../../deleteDialog/deleteDialog.component';
import { User } from '../../user/user.model';
import { Product } from '../../product/product.model';
import { Project } from '../../project/project.model';
import { PaiementQuote } from '../../paiementQuote/paiementQuote.model';
// import { PaiementQuoteDialogComponent } from '../paiementQuote/single/dialog/paiementQuoteDialog.component';
import { PaiementQuoteDialogComponent } from '../../paiementQuote/single/dialog/paiementQuoteDialog.component'

import { TranslateService } from '../../translate/translate.service';
// declare let jsPDF;
import { SignaturePad } from 'angular2-signaturepad/signature-pad';
import { PaiementQuotesComponent } from '../../paiementQuote/paiementQuotes/paiementQuotes.component';
import {Search} from '../../shared/shared.model'



@Component({
  selector: 'app-quote',
  templateUrl: './quote.component.html',
  styleUrls: ['../quote.component.css'],
})
export class QuoteComponent implements OnInit {
  @ViewChild(SignaturePad) signaturePad: SignaturePad;
  @ViewChild(PaiementQuotesComponent) paiementQuotesComponent: PaiementQuotesComponent;

  loading: boolean=false;
  @Output() saved: EventEmitter<any> = new EventEmitter();

  @Input() search: Search = new Search()

  showPaiements: boolean = false
  fetchedQuote: Quote = new Quote()
  autocompleteUser: string = '';
  autocompleteProject: string = '';
  fetchedProducts: Product[] = []

  imgLogoUrl: string = './assets/images/profile-placeholder.jpg'
  imgSignatureBase64Temp = ''
  fetchedPaiementQuotes: PaiementQuote[] = []
  statusQuotes = StatusQuotes
  totalPaiementAmount: number = 0
  myForm: FormGroup;

  public editorOptions = {
    placeholder: "insert content...",
    modules: {
      // toolbar: [['bold', 'italic'], ['link', 'image']] // see https://quilljs.com/docs/formats/
    }
  };

  // autocompleteProduct: String = ''
  fetchedUsers: User[] = [];
  arrayContentToSearch = []
  // ckeditorContent=''
  ckeConfig: any;

  VATs = ModelVATs
  // rowTypes = [
  //   { label: 'Category', value: 'category' },
  //   { label: 'Product', value: 'product' },
  //   { label: 'Text', value: 'text' },
  //
  // ]
  constructor(
    private quoteService: QuoteService,
    private templateQuoteService: TemplateQuoteService,
    private projectService: ProjectService,
    private userService: UserService,
    private productService: ProductService,
    //    private modalService: NgbModal,
    private toastr: ToastsManager,
    public dialog: MatDialog,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private location: Location,
    private _fb: FormBuilder,
    private authService: AuthService,
    private dragulaService: DragulaService,
    private translateService: TranslateService,
  ) {
    // dragulaService.setOptions('third-bag', {
    //   removeOnSpill: true
    // });


    // const bag: any = this.dragulaService.find('third-bag');
    // if (bag !== undefined ) this.dragulaService.destroy('third-bag');
    // // this.dragulaService.setOptions('third-bag', { revertOnSpill: true });
    //

    dragulaService.setOptions('third-bag', {
      moves: function (el, container, handle) {
        return (handle.className === 'fa fa-arrows handle' || handle.className === 'btn btn-sm handle');
      }
    });
  }
  ngOnDestroy() {
    this.dragulaService.destroy('third-bag');
  }
  changeStatutsQuote(statusQuoteSelect){
    console.log(statusQuoteSelect)
  }


  onEditorBlured(quill, i, j) {
    this.changeQuillEditMode(i, j)
  }

  onEditorFocused(quill) {
  }

  onEditorCreated(quill) {
  }

  onContentChanged({ quill, html, text }) {
  }
  changeQuillEditMode(i: number, j: number) {
    this.fetchedQuote.devisDetails[i].bucketProducts[j].isEditMode = !this.fetchedQuote.devisDetails[i].bucketProducts[j].isEditMode
  }


  ngOnInit() {
    // this.statusQuotes.forEach((statusQuote,i)=>{this.statusQuotes[i].label=this.translateService.instant(statusQuote.label)})
    // this.search.isExpense = false
    this.ckeConfig = {
      // height: 500,
      language: "en",
      height: 50,


      toolbar: [
        // { name: "editing", items: ["Scayt", "Find", "Replace", "SelectAll"] },
        // { name: "clipboard", items: ["Cut", "Copy", "Paste", "PasteText", "PasteFromWord", "-", "Undo", "Redo"] },
        // { name: "links", items: ["Link", "Unlink", "Anchor"] },
        // { name: "tools", items: ["Maximize", "ShowBlocks", "Preview", "Print", "Templates"] },
        // { name: "document", items: ["Source"] },
        // { name: "insert", items: ["Image", "Table", "HorizontalRule", "SpecialChar", "Iframe", "imageExplorer"] },
        // "/",
        { name: "basicstyles", items: ["Bold", "Italic", "Underline"] },
        { name: "paragraph", items: ["NumberedList", "BulletedList", "-", "Blockquote"] },
        // { name: "justify", items: ["JustifyLeft", "JustifyCenter", "JustifyRight", "JustifyBlock"] },
        // { name: "styles", items: ["Styles", "Format", "FontSize", "-", "TextColor", "BGColor"] }
      ]
    };


    this.myForm = this._fb.group({
      name: [''],
      quoteNumber: [''],
      statusQuote: [''],
      currency: ['', [Validators.required, Validators.minLength(1)]],
      quoteRef: ['', [Validators.required, Validators.minLength(1)]],

    })

    this.fetchedQuote.detail.dateQuote.issueDateString = this.authService.isoDateToHtmlDate(this.fetchedQuote.detail.dateQuote.issueDate)
    this.fetchedQuote.detail.dateQuote.expiryDateString = this.authService.isoDateToHtmlDate(this.fetchedQuote.detail.dateQuote.expiryDate)

    // this.getCurrentUser();

    this.activatedRoute.params.subscribe((params: Params) => {



      if (params['idQuote']) {
        this.search.quoteId = params['idQuote']
        this.getQuote(params['idQuote'])
      }

      if (params['idClient'])
        this.getUser(params['idClient'])
      if (params['idProject'])
        this.getProject(params['idProject'])
    })
  }
  // onChange(event) {
  //   console.log(event)
  // }
  // onReady(event) {
  //   console.log(event)
  // }
  // onFocus(event) {
  //   console.log(event)
  // }
  // onBlur(event) {
  //   console.log(event)
  // }




  private signaturePadOptions: Object = { // passed through to szimek/signature_pad constructor
    minWidth: 1,
    maxWidth: 4,
    canvasWidth: 250,
    canvasHeight: 200,
    penColor: "rgb(36, 41, 46)"
  };

  togglePaiements() {
    this.showPaiements = !this.showPaiements
  }

  ngAfterViewInit() {
    // this.signaturePad is now available
    this.signaturePad.set('minWidth', 1); // set szimek/signature_pad options at runtime
    this.signaturePad.clear(); // invoke functions from szimek/signature_pad API
  }
  resetSignature() {
    this.signaturePad.clear();
    this.fetchedQuote.signature.isSigned = false
  }
  removeSignature() {
    this.fetchedQuote.signature = new Signature()
    this.fetchedQuote.statusQuote = 0
    this.fetchedQuote.signature.isSigned = false
    this.updateSignature()
  }
  validateSignature() {
    if(this.imgSignatureBase64Temp) {
      this.fetchedQuote.signature.base64 = this.imgSignatureBase64Temp
      this.fetchedQuote.signature.isSigned = true
      this.fetchedQuote.signature.dateSignature = new Date()
      this.fetchedQuote.signature.users = [this.authService.getCurrentUser()]
      this.fetchedQuote.statusQuote = 1
      this.updateSignature()
    }

  }
  drawComplete() {
    // will be notified of szimek/signature_pad's onEnd event
    // console.log(this.signaturePad.toDataURL());
    this.imgSignatureBase64Temp = this.signaturePad.toDataURL()

  }

  drawStart() {
    // will be notified of szimek/signature_pad's onBegin event
    // console.log('begin drawing');
  }

  addRow(typeRow) {
    if (typeRow) {
      if (typeRow === 'category')
        this.addBucketProducts()

      if (!this.fetchedQuote.devisDetails.length)
        this.addBucketProducts()

      if (typeRow === 'product' || typeRow === 'text') {
        let bucketProduct: BucketProduct = new BucketProduct()
        bucketProduct.isEditMode = true
        bucketProduct.typeRow = typeRow
        this.fetchedQuote.devisDetails[this.fetchedQuote.devisDetails.length - 1].bucketProducts.push(bucketProduct)
        this.calculateQuote()
      }
    }
  }



  //
  // openDialog() {
  //
  //   // dialogComp = PaiementQuoteDialogComponent
  //   //
  //
  //   let dialogRef = this.dialog.open(PaiementQuoteDialogComponent, {
  //     data: this.fetchedQuote
  //   });
  //   // dialogRef.componentInstance.fetchedQuote = this.fetchedQuote;
  //   dialogRef.afterClosed().subscribe(result => {
  //     this.paiementQuotesComponent.getPaiementQuotesInit()
  //     // console.log(result)
  //     // this.autocompleteSearch = ''
  //     // if(result) {
  //     //   console.log(result)
  //     //   this.fetchedProject.forms.push( result)
  //     // }
  //   })
  // }


  getBase64Image(imgUrl) {
    return new Promise(
      function(resolve, reject) {

        var img = new Image();
        img.src = imgUrl;
        img.setAttribute('crossOrigin', 'anonymous');

        img.onload = function() {
          var canvas = document.createElement("canvas");
          // console.log(img.width, img.height)
          canvas.width = img.width;
          canvas.height = img.height;
          var ctx = canvas.getContext("2d");
          ctx.drawImage(img, 0, 0);
          var dataURL = canvas.toDataURL("image/png");
          let dataImg = {
            dataURL: dataURL,
            width: img.width,
            height: img.height,
            ratioImg: img.width / img.height
          }
          resolve(dataImg);
        }
        img.onerror = function() {
          reject("The image could not be loaded.");
        }

      });

  }


  downloadPDF() {
    this.loading = true
    this.quoteService.downloadPDF(this.fetchedQuote._id)
      .subscribe(
        res => {
          console.log(res)
           window.open( '/uploads/pdf/' + res );
           this.loading = false

        },
        error => {
          console.log(error);
        }
      )
  }

  saveAsInvoice() {
    this.quoteService.saveAsInvoice(this.fetchedQuote)
      .subscribe(
      res => {
        this.toastr.success('Great!', res.message)
        this.goToInvoice(res.obj._id)
      }, error => { console.log(error) } )
  }

  goToInvoice(id: string){
    this.router.navigate(['quote/' + id]);
  }
  // downloadPDF2() {
  //   let this2 = this
  //   let base64image = this.getBase64Image(this.imgLogoUrl).then(function(dataImg: any) {
  //
  //     let marginLeft = 20
  //     let verticalStep = 10
  //     let heightLogo = 50
  //     var doc = new jsPDF();
  //     let verticalPointer = 0;
  //     //doc.addPage();
  //     doc.addImage(dataImg.dataURL, 'png', 15, 20, heightLogo * dataImg.ratioImg, heightLogo);
  //
  //     doc.setFontSize(22);
  //     verticalPointer += 90
  //     doc.text(120, 20, 'Devis');
  //     doc.setFontSize(16);
  //     if (this2.fetchedQuote.clients.length) {
  //       verticalPointer += verticalStep
  //       doc.text(marginLeft, verticalPointer, 'Client : ' + this2.fetchedQuote.clients[0].profile.lastName + ' ' + this2.fetchedQuote.clients[0].profile.name);
  //     }
  //     if (this2.fetchedQuote.projects.length) {
  //       verticalPointer += verticalStep
  //       doc.text(marginLeft, verticalPointer, 'Projet : ' + this2.fetchedQuote.projects[0].details.name);
  //     }
  //
  //     verticalPointer += verticalStep
  //     doc.text(marginLeft, verticalPointer, 'Details');
  //
  //     doc.setFontSize(10);
  //
  //     verticalPointer += 6
  //     doc.text(marginLeft, verticalPointer, this2.fetchedQuote.name);
  //
  //     // verticalPointer += 6
  //     // doc.text(marginLeft, verticalPointer, this2.fetchedQuote.phoneNumber);
  //
  //     // verticalPointer += 6
  //     // doc.text(marginLeft, verticalPointer, this2.fetchedQuote.address.address);
  //
  //     // verticalPointer += 6
  //     // doc.text(marginLeft, verticalPointer, this2.fetchedQuote.address.city + ' ' + this2.fetchedQuote.address.zip + ' ' + this2.fetchedQuote.address.state + ' ');
  //
  //
  //     doc.setFontSize(12);
  //     verticalPointer += 15
  //     doc.text(15, verticalPointer, 'Description');
  //     doc.text(75, verticalPointer, 'Illustration');
  //     doc.text(105, verticalPointer, 'Unit');
  //     doc.text(120, verticalPointer, 'Qté');
  //     doc.text(135, verticalPointer, 'PU');
  //     doc.text(150, verticalPointer, 'Total HT');
  //     doc.text(180, verticalPointer, 'TVA');
  //
  //     doc.line(10, 125, 200, 125)
  //      doc.line(10, 135, 200, 135)
  //      doc.line(10, 270, 200, 270)
  //
  //     doc.line(10, 125, 10, 270)
  //     doc.line(70, 125, 70, 270)
  //     doc.line(100, 125, 100, 270)
  //     doc.line(115, 125, 115, 270)
  //     doc.line(130, 125, 130, 270)
  //     doc.line(145, 125, 145, 270)
  //     doc.line(175, 125, 175, 270)
  //     doc.line(200, 125, 200, 270)
  //
  //
  //
  //
  //
  //     doc.setFontSize(10);
  //     this2.fetchedQuote.devisDetails.forEach(detail => {
  //       verticalPointer += 6
  //       // doc.text(20, verticalPointer, detail.productInit.details.referenceName );
  //       // doc.text(50, verticalPointer, detail.productInit.details.reference );
  //       // doc.text(80, verticalPointer, detail.quantity.toString());
  //       // doc.text(110, verticalPointer, detail.totalPriceWithoutTaxes.toString() );
  //       // doc.text(140, verticalPointer, detail.totalPriceWithTaxes.toString() );
  //     });
  //
  //     doc.setFontSize(12);
  //     verticalPointer += 12
  //     doc.text(80, verticalPointer, 'Total');
  //     doc.text(110, verticalPointer, this2.fetchedQuote.priceQuote.priceQuoteWithoutTaxes.toString());
  //     doc.text(140, verticalPointer, this2.fetchedQuote.priceQuote.priceQuoteWithTaxes.toString());
  //
  //
  //     doc.save('Test.pdf');
  //
  //   }, function(reason) {
  //     console.log(reason); // Error!
  //   });
  // }

  getUser(id: string) {
    this.userService.getUser(id)
      .subscribe(
      res => {
        this.selectUser(res)
      },
      error => { console.log(error) }
      );
  }


  // Autocomplete User
  selectUser(user: User) {
    this.fetchedQuote.clients = [user]
  }




  getProject(id: string) {
    this.projectService.getProject(id)
      .subscribe(
      res => { this.selectProject(res) },
      error => { console.log(error) }
      );
  }



  selectProject(project: Project) {
    this.fetchedQuote.projects = [project]
  }



  updateSignature() {
    this.quoteService.updateSignature(this.fetchedQuote)
      .subscribe(
      res => {
        this.toastr.success('Great!', res.message)
      },
      error => { console.log(error) }
      )
  }


  save() {
    this.fetchedQuote.detail.dateQuote.issueDate = this.authService.HTMLDatetoIsoDate(this.fetchedQuote.detail.dateQuote.issueDateString)
    this.fetchedQuote.detail.dateQuote.expiryDate = this.authService.HTMLDatetoIsoDate(this.fetchedQuote.detail.dateQuote.expiryDateString)

    if (this.fetchedQuote._id) {
      this.quoteService.updateQuote(this.fetchedQuote)
        .subscribe(
        res => {
          this.toastr.success('Great!', res.message)
          // this.getQuote(res.obj._id)
          this.saved.emit(res)
          //this.router.navigate(['quote/edit/' + this.fetchedQuote._id])
        },
        error => {
          this.toastr.error('error!', error)
        }
        )
    } else {
      this.quoteService.saveQuote(this.fetchedQuote)
        .subscribe(
        res => {
          this.toastr.success('Great!', res.message)
          this.saved.emit(res)
        },
        error => { console.log(error) }
        )
    }
  }



  removeBucketProducts(i) {
    this.fetchedQuote.devisDetails.splice(i, 1);
    this.calculateQuote()
  }
  addBucketProducts() {
    let newDevisDetail = new DevisDetail()
    this.fetchedQuote.devisDetails.push(newDevisDetail)
  }


  selectTemplateQuote(templateQuote: TemplateQuote) {
    this.arrayContentToSearch = []
    templateQuote.devisDetails.forEach(devisDetail => {
      this.fetchedQuote.devisDetails.push(devisDetail)
    })

    this.calculateQuote()
  }
  selectProduct(product: Product, i, j) {

    // let bucketProduct: BucketProduct = new BucketProduct()

    this.fetchedQuote.devisDetails[i].bucketProducts[j].productInit = [product],
      this.fetchedQuote.devisDetails[i].bucketProducts[j].vat = product.details.price.vat,
      this.fetchedQuote.devisDetails[i].bucketProducts[j].priceWithoutTaxes = product.details.price.sellingPrice,
      this.fetchedQuote.devisDetails[i].bucketProducts[j].priceWithTaxes = 0,
      this.fetchedQuote.devisDetails[i].bucketProducts[j].totalPriceWithTaxes = 0,
      this.fetchedQuote.devisDetails[i].bucketProducts[j].totalPriceWithoutTaxes = 0,
      this.fetchedQuote.devisDetails[i].bucketProducts[j].quantity = 1,
      this.fetchedQuote.devisDetails[i].bucketProducts[j].discount = 0,

      // this.autocompleteProduct = ''

      // this.fetchedQuote.devisDetails[i].bucketProducts.push(bucketProduct)
      this.calculateQuote()
  }
  calculateQuote() {
    let this2 = this;
    setTimeout(function() {
      this2.fetchedQuote.priceQuote.priceQuoteWithTaxes = 0
      this2.fetchedQuote.priceQuote.priceQuoteWithoutTaxes = 0

      this2.fetchedQuote.priceQuote.priceQuoteTaxes = []
      this2.VATs.forEach(VAT => {
        let newPriceQuoteTaxe = new PriceQuoteTaxe()
        newPriceQuoteTaxe.VAT = VAT
        this2.fetchedQuote.priceQuote.priceQuoteTaxes.push(newPriceQuoteTaxe)
      })

      this2.fetchedQuote.devisDetails.forEach((devisDetails, i) => {
        this2.fetchedQuote.devisDetails[i].bucketProducts.forEach((product, j) => {
          this2.fetchedQuote.devisDetails[i].bucketProducts[j].priceWithTaxes = product.priceWithoutTaxes * 1 + (product.priceWithoutTaxes * product.vat / 100)
          this2.fetchedQuote.devisDetails[i].bucketProducts[j].totalPriceWithTaxes = this2.fetchedQuote.devisDetails[i].bucketProducts[j].priceWithTaxes * product.quantity
          this2.fetchedQuote.devisDetails[i].bucketProducts[j].totalPriceWithoutTaxes = product.priceWithoutTaxes * product.quantity

          this2.fetchedQuote.priceQuote.priceQuoteWithTaxes = this2.fetchedQuote.priceQuote.priceQuoteWithTaxes * 1 + this2.fetchedQuote.devisDetails[i].bucketProducts[j].totalPriceWithTaxes * 1
          this2.fetchedQuote.priceQuote.priceQuoteWithoutTaxes = this2.fetchedQuote.priceQuote.priceQuoteWithoutTaxes * 1 + this2.fetchedQuote.devisDetails[i].bucketProducts[j].totalPriceWithoutTaxes * 1


          this2.fetchedQuote.priceQuote.priceQuoteTaxes.forEach((priceQuoteTaxe, i) => {
            if(priceQuoteTaxe.VAT === product.vat) {
              this2.fetchedQuote.priceQuote.priceQuoteTaxes[i].TotalVAT += (product.priceWithoutTaxes * product.vat / 100) * product.quantity
            }
          })


        })
      })



      //this2.save()
    }, 20)

  }
  removeRow(i: number, j: number) {
    this.fetchedQuote.devisDetails[i].bucketProducts.splice(j, 1);
    this.calculateQuote()
  }

  // editRaw(i: number, j: number) {
  //   this.fetchedQuote.devisDetails[i].bucketProducts[j].isRawEditModer = true;
  //   // this.calculateQuote()
  // }

  //   parseDate(dateString: string): Date {
  //     if (dateString) {
  //         return new Date(dateString);
  //     } else {
  //         return null;
  //     }
  // }

  // removePaiement(i: number) {
  //   this.fetchedQuote.paiements.splice(i, 1);
  //   this.calculateQuote()
  // }

  // getProducts(page: number, search: any) {
  //   this.productService.getProducts(page, search)
  //     .subscribe(
  //     res => {
  //       this.fetchedProducts = res.data
  //     },
  //     error => {
  //       console.log(error);
  //     }
  //     );
  // }


  saveTemplateQuote(nameTemplate: string) {
    let newTemplateQuote = new TemplateQuote()
    newTemplateQuote.nameTemplate = nameTemplate

    newTemplateQuote.devisDetails = this.fetchedQuote.devisDetails
    this.templateQuoteService.saveTemplateQuote(newTemplateQuote)
      .subscribe(
      res => {
        this.toastr.success('Great!', res.message)
      },
      error => { console.log(error) }
      )
  }

  // move(i: number, incremet: number, typeUser: string) {
  //   if(i>=0 && i<=this[typeUser].length + incremet) {
  //     var tmp = this[typeUser][i];
  //     this[typeUser][i] = this[typeUser][i + incremet]
  //     this[typeUser][i + incremet] = tmp
  //     this.save()
  //   }
  // }




  // goBack() {
  //   this.location.back();
  // }

  // addUser(user) {
  //   const control = <FormArray>this.myForm.controls['_users'];
  //   const addrCtrl = this._fb.group({
  //       _id: ['', Validators.required],
  //   });
  //   control.push(addrCtrl);
  // }




  onDelete(id: string) {
    let this2 = this
    return new Promise(function(resolve, reject) {
      this2.quoteService.deleteQuote(id)
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


  openDialogDelete() {
    let this2 = this
    let dialogRefDelete = this.dialog.open(DeleteDialog)
    dialogRefDelete.afterClosed().subscribe(result => {
      if (result) {
        this.onDelete(this.fetchedQuote._id).then(function() {
          this2.router.navigate(['quote/list/quote']);
        })

      }
    })
  }
  newPaiementQuoteSaved() {
    this.paiementQuotesComponent.getPaiementQuotesInit()
    // this.refreshPaiementQuotes.emit()
    // this.getPaiementQuotesCross.emit(this.fetchedPaiementQuotes)
  }
  getPaiementQuotes(event) {
    // console.log(event)
    this.totalPaiementAmount = 0
    this.fetchedPaiementQuotes = event
    this.fetchedPaiementQuotes.forEach(paiement => {
      this.totalPaiementAmount += paiement.amount
    })
  }
  getQuote(id: string) {
    this.quoteService.getQuote(id)
      .subscribe(
      res => {
        this.fetchedQuote = res
        this.fetchedQuote.detail.dateQuote.issueDateString = this.authService.isoDateToHtmlDate(this.fetchedQuote.detail.dateQuote.issueDate)
        this.fetchedQuote.detail.dateQuote.expiryDateString = this.authService.isoDateToHtmlDate(this.fetchedQuote.detail.dateQuote.expiryDate)

        this.fetchedQuote.projects.forEach(project => { this.search.projectId = project._id })
        this.fetchedQuote.clients.forEach(user => { this.search.userId = user._id })


      },
      error => { console.log(error) }
      )
  }

  isAdmin() {
    return this.authService.isAdmin();
  }



}
