import { Component, OnInit, Input } from '@angular/core';
import { AuthService} from '../../auth/auth.service';
import { StratService} from '../strat.service';
import { Strat} from '../strat.model';
import { ToastsManager} from 'ng2-toastr';
import { MatDialog} from '@angular/material';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import { DomSanitizer } from '@angular/platform-browser';
import { ViewEncapsulation} from '@angular/core';
import { UserService} from '../../user/user.service';
import {ShowNavBarData} from '../../home/home.model'
import {GlobalEventsManager} from '../../globalEventsManager';
import {Search} from '../../home/home.model'



@Component({
  selector: 'app-strats',
  templateUrl: './strats.component.html',
  styleUrls: ['../strat.component.css'],
  encapsulation: ViewEncapsulation.None

})
export class StratsComponent implements OnInit {
  @Input() userId = '';
  editMode: boolean = false;
  @Input() search: Search = new Search()

  // token: string = localStorage.getItem('id_token');
  fetchedStrats: Strat[] = [];
  // search: any = {
  //   categories : [],
  //   search: ''
  // };
  loading: boolean;

  paginationData = {
    currentPage: 1,
    itemsPerPage: 0,
    totalItems: 0
  };


  categories2 = '';



  constructor(
    private globalEventsManager: GlobalEventsManager,
    private sanitizer: DomSanitizer,
    private stratService: StratService,
    private toastr: ToastsManager,
    // public dialog: MatDialog,
    private router: Router,
    private location: Location,
    private authService: AuthService,
    private userService: UserService,
    private activatedRoute: ActivatedRoute,

  ) {
    this.globalEventsManager.refreshCenterEmitter.subscribe((isRefresh) => {
        if(isRefresh) {
          this.getStrats(1, this.search)
          this.globalEventsManager.refreshCenter(false);
        }

    })
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params: Params) => {
    this.getStrats(1, this.search)
  })

    // let this2 = this
    // setTimeout(function(){
    //   this2.search.userId = this2.userId
    //   this2.search.orderBy = 'name'
    //   this2.getStrats(1, this2.search)
    // }, 200);
  }

  // ngOnChanges(changes: any){
  //   console.log('test')
  //
  // }
  // test() {
  //   r77')
  // }

  // searchStrats() {
  //   this.getStrats(1, this.search)
  // }

  // onDelete(id: string) {
  //   this.stratService.deleteStrat(id)
  //     .subscribe(
  //       res => {
  //         this.toastr.success('Great!', res.message);
  //         console.log(res);
  //       },
  //       error => {
  //         console.log(error);
  //       }
  //     );
  // }

  getPage(page: number) {
    this.getStrats(page, this.search);
  }
  goTo(stratId: string) {
    this.openCategoriesSideBar(stratId)
    this.router.navigate(['strat/' + stratId]);
  }
  openCategoriesSideBar(stratId: string) {
    let newShowNavBarData = new ShowNavBarData()
    newShowNavBarData.search.typeObj = 'categorie'
    newShowNavBarData.search.stratId = stratId
    newShowNavBarData.search.projectId = this.search.projectId
    this.globalEventsManager.showNavBarLeft(newShowNavBarData)
  }

  // loadMore(){
  //   this.paginationData.currentPage = this.paginationData.currentPage+1
  //   this.getStrats(this.paginationData.currentPage, this.search)
  // }

  createNewStrat() {
    let newShowNavBarData = new ShowNavBarData()
    newShowNavBarData.search.typeObj = 'strat'
    newShowNavBarData.search.projectId = this.search.projectId
    // newShowNavBarData.search.stratType = this.search.stratType
    this.globalEventsManager.showNavBarRight(newShowNavBarData)
  }
  openDeleteStrat(stratId: string) {
    let newShowNavBarData = new ShowNavBarData()
    newShowNavBarData.search.typeScreen = 'deleteConfirmation'
    newShowNavBarData.search.typeObj = 'strat'
    newShowNavBarData.search.stratId = stratId
    this.globalEventsManager.showNavBarRight(newShowNavBarData)
  }

  getStrats(page: number, search: any) {
    this.loading = true;
    this.stratService.getStrats(page, search)
      .subscribe(
        res => {
          this.paginationData = res.paginationData;
          this.fetchedStrats = res.data
          this.fetchedStrats.forEach((strat, i) => {
              this.fetchedStrats[i].dateStrat.percentageProgress = this.authService.getPourcentageProgress(strat.dateStrat.start, strat.dateStrat.end)
          });


          // let durationProject = +new Date(this.fetchedProject.dateProject.end) - +new Date(this.fetchedProject.dateProject.start)
          // let timeSpent = +new Date() - +new Date(this.fetchedProject.dateProject.start)
          // this.fetchedProject.dateProject.percentageProgress = Math.round((timeSpent / durationProject) * 100)
          //
          this.loading = false;
        },
        error => {
          console.log(error);
        }
      );
  }



  // isAdmin() {
  //   return this.authService.isAdmin();
  // }
}
