import { Component, OnInit} from '@angular/core';
import { AuthService} from '../../auth/auth.service';
import { CategorieService} from '../categorie.service';
import { Categorie} from '../categorie.model';
import { ToastsManager} from 'ng2-toastr';
import { MatDialog} from '@angular/material';
import { Router} from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { ViewEncapsulation} from '@angular/core';
import { UserService} from '../../user/user.service';


@Component({
  selector: 'app-adminCategories',
  templateUrl: './adminCategories.component.html',
  styleUrls: ['../categorie.component.css'],
  encapsulation: ViewEncapsulation.None

})
export class AdminCategoriesComponent implements OnInit {
  token: string = localStorage.getItem('id_token');
  fetchedCategories: Categorie[] = [];
  search: any = {
    categories : [],
    search: ''
  };
  loading: boolean= false;

  paginationData = {
    currentPage: 1,
    itemsPerPage: 0,
    totalItems: 0
  };

  trackinPage : any = {
    lastVisitPagePressCount:[],
    lastVisitPageCategorieCount:[]
  }

  constructor(
    private sanitizer: DomSanitizer,
    private categorieService: CategorieService,
    private toastr: ToastsManager,
    // public dialog: MatDialog,
    private router: Router,
    // private location: Location,
    private authService: AuthService,
    private userService: UserService,
    // private translateService: TranslateService,
  ) {
  }






  searchCategories() {
    this.getCategories(1, this.search)
  }




  onDelete(id: string) {
    this.categorieService.deleteCategorie(id)
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
    this.getCategories(page, this.search);
  }
  saved(result) {
    if(result)
      this.getCategories(1, this.search)
  }

  // loadMore(){
  //   this.paginationData.currentPage = this.paginationData.currentPage+1
  //   this.getCategories(this.paginationData.currentPage, this.search)
  // }

  getCategories(page: number, search: any) {
    this.loading = true;
    this.categorieService.getCategories(page, search)
      .subscribe(
        res => {
          this.paginationData = res.paginationData;
          this.fetchedCategories = res.data
          this.loading = false;
        },
        error => {
          console.log(error);
        }
      );
  }


  ngOnInit() {
    // this.translateService.use('fr');
    // console.log(this.translateService.instant('Add a categorie'))
    this.getCategories(1, this.search)
  }

  isAdmin() {
    return this.authService.isAdmin();
  }
}
