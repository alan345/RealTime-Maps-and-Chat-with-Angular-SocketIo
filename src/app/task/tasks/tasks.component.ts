import { Component, OnInit, Input } from '@angular/core';
import { AuthService} from '../../auth/auth.service';
import { TaskService} from '../task.service';
import { Task} from '../task.model';
import { ToastsManager} from 'ng2-toastr';
import { MatDialog} from '@angular/material';
import { Router} from '@angular/router';
import { Location } from '@angular/common';
import { DomSanitizer } from '@angular/platform-browser';
import { ViewEncapsulation} from '@angular/core';
import { UserService} from '../../user/user.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['../task.component.css'],
  encapsulation: ViewEncapsulation.None

})
export class TasksComponent implements OnInit {
  @Input() userId = '';
  @Input() showHeader = true;
  token: string = localStorage.getItem('id_token');
  fetchedTasks: Task[] = [];
  search: any = {
    categories : [],
    search: ''
  };
  loading: boolean;

  paginationData = {
    currentPage: 1,
    itemsPerPage: 0,
    totalItems: 0
  };


  categories2 = '';



  constructor(
    private sanitizer: DomSanitizer,
    private taskService: TaskService,
    private toastr: ToastsManager,
    public dialog: MatDialog,
    private router: Router,
    private location: Location,
    private authService: AuthService,
    private userService: UserService,

  ) {
  }


  goBack() {
    this.location.back();
  }

  searchTasks() {
    this.getTasks(1, this.search)
  }

  onDelete(id: string) {
    this.taskService.deleteTask(id)
      .subscribe(
        res => {
          this.toastr.success('Great!', res.message);
          console.log(res);
        },
        error => {
          console.log(error);
        }
      );
  }

  getPage(page: number) {
    this.getTasks(page, this.search);
  }


  loadMore(){
    this.paginationData.currentPage = this.paginationData.currentPage+1
    this.getTasks(this.paginationData.currentPage, this.search)
  }


  getTasks(page: number, search: any) {
    this.loading = true;
    this.taskService.getTasks(page, search)
      .subscribe(
        res => {
          this.paginationData = res.paginationData;
          this.fetchedTasks = res.data

          this.loading = false;
        },
        error => {
          console.log(error);
        }
      );
  }

  ngOnInit() {
    let this2 = this
    setTimeout(function(){
      this2.search.userId = this2.userId
      this2.search.orderBy = 'name'
      this2.getTasks(1, this2.search)
    }, 200);
  }

  isAdmin() {
    return this.authService.isAdmin();
  }
}
