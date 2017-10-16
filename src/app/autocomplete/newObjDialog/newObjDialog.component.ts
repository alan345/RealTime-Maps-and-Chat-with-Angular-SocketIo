import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { TranslateService } from '../../translate/translate.service';
import { UserDialogComponent } from '../../user/singleUser/dialog/userDialog.component';
import { QuoteDialogComponent } from '../../quote/single/dialog/quoteDialog.component';
import { CompanieDialogComponent } from '../../companie/single/dialog/companieDialog.component';
import { ProjectDialogComponent } from '../../project/single/dialog/projectDialog.component';
import { ProductDialogComponent } from '../../product/single/dialog/productDialog.component';
import {Search} from '../../shared/shared.model'


import { PaiementQuoteDialogComponent } from '../../paiementQuote/single/dialog/paiementQuoteDialog.component';


import { MatDialog } from '@angular/material';


@Component({
  selector: 'app-newObjDialog',
  templateUrl: './newObjDialog.component.html',
  styleUrls: ['./newObjDialog.component.css']
})
export class newObjDialogComponent implements OnInit {

  @Input() search = new Search();
  @Input() typeObj: string = '';
  @Input() title: string = '';
  @Input() icone: string = 'fa fa-plus';
  @Output() saved: EventEmitter<any> = new EventEmitter();


  constructor(
    private authService: AuthService,
    private router: Router,
    private location: Location,
    private translateService: TranslateService,
    public mdDialog: MatDialog,
  ) { }


  ngOnInit() { }

  openDialog(typeObj: string) {
    // console.log(this.search)
    // if (typeObj === 'quote') {
    //   this.router.navigate(['/quote/new']);
    // } else
    if (typeObj === 'right') {
      this.router.navigate(['/right/new']);
    } else {

      let dialogComp: any
      if (typeObj == 'user')
        dialogComp = UserDialogComponent

      if (typeObj == 'quote')
        dialogComp = QuoteDialogComponent

      if (typeObj == 'companie')
        dialogComp = CompanieDialogComponent

      if (typeObj == 'project')
        dialogComp = ProjectDialogComponent

      if (typeObj == 'paiementQuote')
        dialogComp = PaiementQuoteDialogComponent

      if (typeObj == 'product')
        dialogComp = ProductDialogComponent


      let dialogRef = this.mdDialog.open(dialogComp, {
        data: {
          search: this.search
        }
      });

      dialogRef.afterClosed().subscribe(result => {
        this.saved.emit(result)
      })
    }



  }

}
