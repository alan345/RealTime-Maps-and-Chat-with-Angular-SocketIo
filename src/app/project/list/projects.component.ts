import { Component, OnInit, Input } from '@angular/core';
import { AuthService} from '../../auth/auth.service';
import { ProjectService} from '../project.service';
import { Project} from '../project.model';
import { ToastsManager} from 'ng2-toastr';
import { MatDialog} from '@angular/material';
import { Router, ActivatedRoute, Params} from '@angular/router';
import { Location } from '@angular/common';
import { DomSanitizer } from '@angular/platform-browser';
import { ViewEncapsulation} from '@angular/core';
import { UserService} from '../../user/user.service';
import {GlobalEventsManager} from '../../globalEventsManager';
import {Search, PaginationData} from '../../home/home.model';
import {ShowNavBarData} from '../../home/home.model';



@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['../project.component.css'],
  encapsulation: ViewEncapsulation.None

})
export class ProjectsComponent implements OnInit {
  @Input() userId = '';
  @Input() showHeader = true;
  // token: string = localStorage.getItem('id_token');
  fetchedProjects: Project[] = [];
  @Input() search: Search = new Search
  loading: boolean;

  paginationData: PaginationData = new PaginationData()

  // categories2 = '';



  constructor(
    // private sanitizer: DomSanitizer,
    private projectService: ProjectService,
    private toastr: ToastsManager,
    private globalEventsManager: GlobalEventsManager,
    private activatedRoute: ActivatedRoute,
    // // public dialog: MatDialog,
    private router: Router,
    // private location: Location,
    // private authService: AuthService,
    // private userService: UserService,

  ) {
    this.globalEventsManager.refreshCenterEmitter.subscribe((isRefresh) => {
        if(isRefresh) {
          this.getProjects(1, this.search)
          this.globalEventsManager.refreshCenter(false);
        }

    })
  }
  ngOnChanges() {
  }



  ngOnInit() {
    this.getProjects(1, this.search)
    //might be change into ngOnCVHanges
    // this.activatedRoute.params.subscribe((params: Params) => {
    //   console.log(params)
    //   console.log('ddd')
    //   this.getProjects(1, this.search)
    // })
    // }, 200);
  }
  // goBack() {
  //   this.location.back();
  // }
  goToProject(projectId: string){
    this.router.navigate(['project/' + projectId]);
    this.openProjects(projectId)
  }
  openProjects(projectId: string) {
    let showNavBarData = new ShowNavBarData()
    showNavBarData.showNavBar = true
    showNavBarData.search.typeObj = 'project'
    showNavBarData.search.projectId = projectId
    this.globalEventsManager.showNavBarLeft(showNavBarData);
  }

  searchProjects() {
    this.getProjects(1, this.search)
  }

  onDelete(id: string) {
    this.projectService.deleteProject(id)
      .subscribe(
        res => {
          this.toastr.success('Great!', res.message);
          // console.log(res);
        },
        error => {
          console.log(error);
        }
      );
  }

  getPage(page: number) {
    this.getProjects(page, this.search);
  }

  //
  // loadMore(){
  //   this.paginationData.currentPage = this.paginationData.currentPage+1
  //   this.getProjects(this.paginationData.currentPage, this.search)
  // }


  getProjects(page : number, search: any) {
    //this.fetchedProjects =[]
    this.loading = true;
    this.projectService.getProjects(page, search)
      .subscribe(
        res => {
          this.paginationData = res.paginationData;
          this.fetchedProjects = res.data

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
