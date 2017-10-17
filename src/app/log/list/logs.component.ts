import { Component, OnInit, Input } from '@angular/core';
import { AuthService} from '../../auth/auth.service';
import { LogService} from '../log.service';
import { Log} from '../log.model';
import { ToastsManager} from 'ng2-toastr';
import { MatDialog} from '@angular/material';
import { Router} from '@angular/router';
import { Location } from '@angular/common';
import { DomSanitizer } from '@angular/platform-browser';
import { ViewEncapsulation} from '@angular/core';
import { UserService} from '../../user/user.service';
// import { DeleteDialog } from '../../deleteDialog/deleteDialog.component';
import {Search, PaginationData} from '../../home/home.model'


@Component({
  selector: 'app-logs',
  templateUrl: './logs.component.html',
  styleUrls: ['../log.component.css'],
  encapsulation: ViewEncapsulation.None

})
export class LogsComponent implements OnInit {
  @Input() userId: string = '';
  @Input() showHeader = true;
  fetchedLogs: Log[] = [];
  @Input() search: Search = new Search()
  loading: boolean;

  paginationData: PaginationData = new PaginationData()


  categories2 = '';



  constructor(
    private sanitizer: DomSanitizer,
    private logService: LogService,
    private toastr: ToastsManager,
    // public dialog: MatDialog,
    private router: Router,
    private location: Location,
    private authService: AuthService,
    private userService: UserService,

  ) {
  }


  // goBack() {
  //   this.location.back();
  // }
  saved() {
    this.getLogs(1, this.search)
  }
  // searchLogs() {
  //   this.getLogs(1, this.search)
  // }

  // openDialogDelete(id: string){
  //   let this2 = this
  //   let dialogRefDelete = this.dialog.open(DeleteDialog)
  //   dialogRefDelete.afterClosed().subscribe(result => {
  //     if(result) {
  //       this.onDelete(id)
  //     }
  //   })
  // }
  getResultAutocomplete(result: Search) {
    this.search = result
    this.getLogs(1, this.search)
  }
  // onDelete(id: string) {
  //   this.logService.deleteLog(id)
  //     .subscribe(
  //       res => {
  //         this.toastr.success('Great!', res.message);
  //         this.getLogs(this.paginationData.currentPage, this.search)
  //         console.log(res);
  //       },
  //       error => {
  //         console.log(error);
  //       }
  //     );
  // }

  getPage(page: number) {
    this.getLogs(page, this.search);
  }


  // loadMore() {
  //   this.paginationData.currentPage = this.paginationData.currentPage+1
  //   this.getLogs(this.paginationData.currentPage, this.search)
  // }


  getLogs(page: number, search: any) {
    this.loading = true;
    this.logService.getLogs(page, search)
      .subscribe(
        res => {
          this.paginationData = res.paginationData;
          this.fetchedLogs = res.data

          this.loading = false;
        },
        error => {
          console.log(error);
        }
      );
  }

  ngOnInit() {
    // let this2 = this
    // setTimeout(function(){
    //   this2.search.userId = this2.userId
    //   // this2.search.orderBy = 'name'
    //   this2.getLogs(1, this2.search)
    // }, 200);
  }

  // isAdmin() {
  //   return this.authService.isAdmin();
  // }
}
