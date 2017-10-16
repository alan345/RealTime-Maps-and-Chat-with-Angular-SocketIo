import { Component, OnInit} from '@angular/core';
import { AuthService} from '../../auth/auth.service';
import { NotificationService} from '../../notification/notification.service';
import { Notification} from '../notification.model';
import { ToastsManager} from 'ng2-toastr';
import { MatDialog} from '@angular/material';
import { Router} from '@angular/router';
import { Location} from '@angular/common';
import { UserService} from '../../user/user.service';


@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['../notification.component.css'],
})
export class NotificationsComponent implements OnInit {
  fetchedNotifications: Notification[] = [];
  loading: boolean;
  paginationData = {
    currentPage: 1,
    itemsPerPage: 0,
    totalItems: 0
  };

  search = {
    orderBy : '',
    search: '',
    notificationType: '',
  };

  constructor(
    private notificationService: NotificationService,
    private authService: AuthService,
    private userService: UserService,
    private toastr: ToastsManager,
    public dialog: MatDialog,
    private router: Router,
    private location: Location,
  ) {}

  ngOnInit() {
    this.search.orderBy = 'name'
    this.getNotifications(this.paginationData.currentPage, this.search)
  }

  // openDialog() {
  //
  // }

  goBack() {
    this.location.back();
  }

  // searchInput() {
  //   this.getNotifications(this.paginationData.currentPage, this.search)
  // }
  //
  // orderBy(orderBy: string) {
  //   this.search.orderBy = orderBy
  //   this.getNotifications(this.paginationData.currentPage, this.search)
  // }

  onDelete(id: string) {
    this.notificationService.deleteNotification(id)
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


  searchNotifications() {
    this.getNotifications(1, this.search)
  }


  getPage(page: number) {

    this.loading = true;
    this.getNotifications(page, this.search);
  }


  getNotifications(page: number, search: any) {
    this.notificationService.getNotifications(page, search)
      .subscribe(
        res => {
          this.paginationData = res.paginationData;
          this.fetchedNotifications =  res.data
          this.loading = false;
          this.updateDateSeeLatestNotif()
        },
        error => {
          console.log(error);
        }
      );
  }

  updateDateSeeLatestNotif() {
    this.userService.updateDateSeeLatestNotif(this.authService.getCurrentUser())
      .subscribe(
        res => {
          // console.log(res)
        },
        error => {
          console.log(error)
        }
      );
  }
  //
  // isAdmin() {
  //   return this.authService.isAdmin();
  // }


}
