import { Component, OnInit} from '@angular/core';
import { AuthService} from '../../auth/auth.service';
import { UserService} from '../../user/user.service';
import { User} from '../../user/user.model';
import { ToastsManager} from 'ng2-toastr';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';





@Component({
  selector: 'app-users',
  templateUrl: './adminUsers.component.html',
  styleUrls: ['../../user/user.component.css'],

})
export class AdminUsersComponent implements OnInit {
  fetchedUsers: User[] = [];
  loading: boolean;
  search = {
    orderBy : '',
    search: '',
    isExternalUser: true,
  };
  paginationData = {
    currentPage: 1,
    itemsPerPage: 0,
    totalItems: 0
  };


  constructor(
    private userService: UserService,
    private toastr: ToastsManager,
    private router: Router,
    private location: Location,
    private authService: AuthService,
    private activatedRoute: ActivatedRoute,
  ) {}


  ngOnInit() {
    this.activatedRoute.params.subscribe((params: Params) => {
      if(params['isExternalUser']) {
        this.search.isExternalUser = params['isExternalUser']
        this.search.orderBy = 'profile.name';
        this.getUsers(this.paginationData.currentPage, this.search);
      }
    })


  }
  // goBack() {
  //   this.location.back();
  // }

  saved(result) {
    this.getUsers(this.paginationData.currentPage, this.search);
  }

  // onSelectChange = ($event: any): void => {
  //   // console.log($event.tab.content.viewContainerRef.element.nativeElement.getAttribute('data-value'))
  //   this.search.isExternalUser = $event.tab.content.viewContainerRef.element.nativeElement.getAttribute('data-isExternalUser')
  //   this.getUsers(this.paginationData.currentPage, this.search);
  //
  // }

  searchUsers() {
    this.getUsers(1, this.search)
  }

  searchInput() {
    this.getUsers(this.paginationData.currentPage, this.search);
  }
  orderBy(orderBy: string) {
    this.search.orderBy = orderBy;
    this.getUsers(this.paginationData.currentPage, this.search);
  }

  onDelete(id: string) {
    this.userService.deleteUser(id)
      .subscribe(
        res => {
          this.toastr.success('Great!', res.message);
        },
        error => {
          console.log(error);
        }
      );
  }

  getPage(page: number) {

    this.loading = true;
    this.getUsers(page, this.search);
  }

  getUsers(page: number, search: any) {
    this.userService.getUsers(page, search)
      .subscribe(
        res => {
          this.paginationData = res.paginationData;
          this.fetchedUsers =  res.data;
          this.loading = false;
        },
        error => {
          console.log(error);
        }
      );
  }

}
