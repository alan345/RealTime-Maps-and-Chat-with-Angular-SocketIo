import { Component, OnInit, ViewChild, Input, Output, EventEmitter} from '@angular/core';
import { AuthService} from '../auth/auth.service';
import { PaiementQuoteService} from '../paiementQuote/paiementQuote.service';
import { QuoteService} from '../quote/quote.service';

import { PaiementQuote} from '../paiementQuote/paiementQuote.model';
import { ToastsManager} from 'ng2-toastr';
import { MatDialog} from '@angular/material';
import { Router} from '@angular/router';
import { Location} from '@angular/common';
import { PaiementQuoteGraph } from './reporting.model'
import { BaseChartDirective } from 'ng2-charts/ng2-charts';




@Component({
  selector: 'app-reporting',
  templateUrl: './reportings.component.html',
  styleUrls: ['./reporting.component.css'],
})
export class ReportingsComponent implements OnInit {
  // @Input() userId = '';
  // @Input() idQuote = '';
  @Input() showHeader: boolean = true;
  // @Output() getPaiementQuotesCross: EventEmitter<any> = new EventEmitter();
  // @Input() showCreate: boolean = true;

  // fetchedPaiementQuoteGraphs: PaiementQuoteGraph[] = [];
  @ViewChild(BaseChartDirective) public chart: BaseChartDirective;

  loading: boolean;
  // paginationData = {
  //   currentPage: 1,
  //   itemsPerPage: 0,
  //   totalItems: 0
  // };

  search = {
    orderBy : '',
    search: '',
    idQuote:'',
  };

  constructor(
    private paiementQuoteService: PaiementQuoteService,
    private authService: AuthService,
  //  private modalService: NgbModal,
    private toastr: ToastsManager,
    public dialog: MatDialog,
    private router: Router,
    private location: Location,
    private quoteService: QuoteService,
  ) {}






  ngOnInit() {
    this.lineChartData = [
      {data: [0, 0, 0, 0, 0, 0, 0, 0, 0 ,0, 0, 0], label: 'Paiements', year: 0},
      {data: [0, 0, 0, 0, 0, 0, 0, 0, 0 ,0, 0, 0], label: 'Quotes', year: 0}
    ]
    this.getPaiementQuotesGraph(2017, this.search)
    this.getQuotesGraph(2017, this.search)
  }





  // lineChart
    public lineChartData:Array<any>
    public lineChartLabels:Array<any> = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'oct', 'nov','dec'];
    public lineChartOptions:any = {
      responsive: true
    };
    public lineChartColors:Array<any> = [];
    public lineChartLegend:boolean = true;
    public lineChartType:string = 'line';


    public chartClicked(e:any):void {
      console.log(e);
    }

    public chartHovered(e:any):void {
      console.log(e);
    }






  goBack() {
    this.location.back();
  }

  getQuotesGraph(year: number, search: any) {
    this.quoteService.getQuotesGraph(year, search)
      .subscribe(
        res => {
          res.item.forEach((element, index)=>{
            this.lineChartData[1].year = element._id.year
            this.lineChartData[1].data[element._id.month - 1] = element.amountTotal
          })
          this.chart.chart.update();
        },
        error => {
          console.log(error);
        }
      );
  }

  getPaiementQuotesGraph(year: number, search: any) {
    this.paiementQuoteService.getPaiementQuotesGraph(year, search)
      .subscribe(
        res => {

          // this.lineChartData = [
          //   {data: [0, 0, 0, 10, 0, 0, 0, 0, 0 ,0, 0, 0], label: 'Paiements', year: 0},
          //   {data: [0, 0, 0, 0, 20, 0, 0, 0, 0 ,0, 0, 0], label: 'Quotes', year: 0}
          // ]

          res.item.forEach((element, index)=>{
            this.lineChartData[0].year = element._id.year
            this.lineChartData[0].data[element._id.month - 1] = element.amountTotal
          })
          this.chart.chart.update();
        },
        error => {
          console.log(error);
        }
      );
  }


  isAdmin() {
    return this.authService.isAdmin();
  }


}
