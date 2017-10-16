import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { AuthService} from '../../auth/auth.service';
import { PaiementQuoteService} from '../../paiementQuote/paiementQuote.service';
import { PaiementQuote} from '../../paiementQuote/paiementQuote.model';
import { ToastsManager} from 'ng2-toastr';
import { MatDialog} from '@angular/material';
import { Router, ActivatedRoute, Params} from '@angular/router';
import { Location} from '@angular/common';

import { Search} from '../../shared/shared.model'




@Component({
  selector: 'app-paiementQuotes',
  templateUrl: './paiementQuotes.component.html',
  styleUrls: ['../../admin/admin.component.css'],
})
export class PaiementQuotesComponent implements OnInit {
  // @Input() userId = '';
  // @Input() idQuote = '';
  // @Input() showHeader: boolean = true;
  @Output() getPaiementQuotesCross: EventEmitter<any> = new EventEmitter();
  // @Input() showCreate: boolean = true;
  @Input() search: Search = new Search()




  fetchedPaiementQuotes: PaiementQuote[] = [];
  loading: boolean;
  paginationData = {
    currentPage: 1,
    itemsPerPage: 0,
    totalItems: 0
  };

  // search = {
  //   orderBy : '',
  //   search: '',
  //   idQuote:'',
  //   isExpense: false
  // };

  constructor(
    private paiementQuoteService: PaiementQuoteService,
    private authService: AuthService,
    private activatedRoute: ActivatedRoute,
    private toastr: ToastsManager,
    public dialog: MatDialog,
    private router: Router,
    private location: Location,
  ) {}



  ngOnInit() {
    this.activatedRoute.params.subscribe((params: Params) => {
      if(params['isExpense']=='true') {this.search.isExpense = true} else {this.search.isExpense = false}
        this.getPaiementQuotesInit()
    })



  }


  getPaiementQuotesInit() {
    let this2 = this
    setTimeout(function(){
      // this2.search.quoteId = this2.idQuote
      this2.search.orderBy = 'name'
      this2.getPaiementQuotes(1, this2.search)
    }, 200);
  }
  searchPaiementQuotes(){}


  goBack() {
    this.location.back();
  }

  searchInput() {
    this.getPaiementQuotes(this.paginationData.currentPage, this.search)
  }

  orderBy(orderBy: string) {
    this.search.orderBy = orderBy
    this.getPaiementQuotes(this.paginationData.currentPage, this.search)
  }

  onDelete(id: string) {
    this.paiementQuoteService.deletePaiementQuote(id)
      .subscribe(
        res => {
          this.getPaiementQuotesInit()
          this.toastr.success('Great!', res.message);
          this.getPaiementQuotesCross.emit(this.fetchedPaiementQuotes)
          // console.log(res);
        },
        error => {
          console.log(error);
        }
      );
  }


  getPage(page: number) {
    this.getPaiementQuotes(page, this.search);
  }


  getPaiementQuotes(page: number, search: any) {
    this.loading = true;
    this.paiementQuoteService.getPaiementQuotes(page, search)
      .subscribe(
        res => {
          this.paginationData = res.paginationData;
          this.fetchedPaiementQuotes =  res.data
          this.loading = false;
          this.getPaiementQuotesCross.emit(this.fetchedPaiementQuotes)
        },
        error => {
          console.log(error);
        }
      );
  }
  saved(result) {
    this.getPaiementQuotesInit()
  }

  isAdmin() {
    return this.authService.isAdmin();
  }


}
