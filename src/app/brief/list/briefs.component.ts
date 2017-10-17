import { Component, OnInit, Input } from '@angular/core';
import { AuthService} from '../../auth/auth.service';
import { BriefService} from '../brief.service';
import { Brief} from '../brief.model';
import { ToastsManager} from 'ng2-toastr';
import { MatDialog} from '@angular/material';
import { Router} from '@angular/router';
import { Location } from '@angular/common';
import { DomSanitizer } from '@angular/platform-browser';
import { ViewEncapsulation} from '@angular/core';
import { UserService} from '../../user/user.service';
import {ShowNavBarData} from '../../home/home.model'
import {GlobalEventsManager} from '../../globalEventsManager';
import {Search} from '../../home/home.model'


@Component({
  selector: 'app-briefs',
  templateUrl: './briefs.component.html',
  styleUrls: ['../brief.component.css'],
  encapsulation: ViewEncapsulation.None

})
export class BriefsComponent implements OnInit {
  @Input() userId = '';
  @Input() showHeader = true;
  // token: string = localStorage.getItem('id_token');
  fetchedBriefs: Brief[] = [];
  @Input() search: Search = new Search()
  loading: boolean;

  paginationData = {
    currentPage: 1,
    itemsPerPage: 0,
    totalItems: 0
  };


  categories2 = '';



  constructor(
    // private sanitizer: DomSanitizer,
    private briefService: BriefService,
    private toastr: ToastsManager,
    private globalEventsManager: GlobalEventsManager,
    // // public dialog: MatDialog,
    // private router: Router,
    // private location: Location,
    // private authService: AuthService,
    // private userService: UserService,

  ) {
    this.globalEventsManager.refreshCenterEmitter.subscribe((isRefresh) => {
      if (isRefresh) {
        this.globalEventsManager.refreshCenter(false);
        this.getBriefs(1, this.search)
      }
    })
  }

  ngOnInit() {
    let this2 = this
    // setTimeout(function(){
    //   this2.search.userId = this2.userId
    //   this2.search.orderBy = 'name'
      this2.getBriefs(1, this2.search)
    // }, 200);
  }
  //
  addBrief() {
    let showNavBarData = new ShowNavBarData()
    showNavBarData.showNavBar = true
    showNavBarData.search.typeScreen = 'object'
    showNavBarData.search.typeObj = 'brief'
    showNavBarData.search.stratId = this.search.stratId
    this.globalEventsManager.showNavBarRight(showNavBarData);
  }



  // goBack() {
  //   this.location.back();
  // }

  // searchBriefs() {
  //   this.getBriefs(1, this.search)
  // }
  //
  // onDelete(id: string) {
  //   this.briefService.deleteBrief(id)
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
    this.getBriefs(page, this.search);
  }


  // loadMore(){
  //   this.paginationData.currentPage = this.paginationData.currentPage+1
  //   this.getBriefs(this.paginationData.currentPage, this.search)
  // }


  getBriefs(page : number, search: any) {
    //this.fetchedBriefs =[]
    this.loading = true;
    this.briefService.getBriefs(page, search)
      .subscribe(
        res => {
          this.paginationData = res.paginationData;
          this.fetchedBriefs = res.data

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
