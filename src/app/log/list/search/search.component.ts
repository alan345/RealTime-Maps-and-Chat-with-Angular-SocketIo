import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {AuthService} from '../../../auth/auth.service';
import {LogService} from '../../log.service';
// import {CategorieService} from '../../categorie/categorie.service';
// import { ProjectService} from '../../project/project.service';

import {Log} from '../../log.model';

import {ToastsManager} from 'ng2-toastr';

import {MatDialog } from '@angular/material';
import {Router, ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import { FormBuilder} from '@angular/forms';
// import { UserService} from '../../user/user.service';
// import { QuoteService } from '../../quote/quote.service';
// import { DeleteDialog } from '../../deleteDialog/deleteDialog.component';
import { User } from '../../../user/user.model';
import { Mission } from '../../../mission/mission.model';
import { Strat } from '../../../strat/strat.model';
import { Document } from '../../../document/document.model';
// // import { Quote } from '../../quote/quote.model';
// import { Categorie } from '../../categorie/categorie.model';
import { Project } from '../../../project/project.model';
// import { Project } from '../../project/project.model';
import {Search} from '../../../home/home.model'





@Component({
  selector: 'app-logsSearch',
  templateUrl: './search.component.html',
  styleUrls: ['../../log.component.css'],
})
export class SearchComponent implements OnInit {

  @Input() search: Search = new Search()
  @Output() getResultAutocomplete: EventEmitter<any> = new EventEmitter();

  searchUsers: User[] = [];
  searchMissions: Mission[] = [];
  searchStrats: Strat[] = [];
  searchProjects: Project[] = [];
  searchDocuments: Document[] = [];
  startString: string = '';
  endString: string = '';

  constructor(
    private logService: LogService,
    // private quoteService: QuoteService,
    // private projectService: ProjectService,
    // private userService: UserService,
    // private categorieService: CategorieService,
//    private modalService: NgbModal,
    private toastr: ToastsManager,
    // public dialog: MatDialog,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private location: Location,
    private _fb: FormBuilder,
    private authService: AuthService,
  ) {}

  ngOnInit() {

    this.search.start = new Date();
    this.search.start.setDate(this.search.start.getDate() - 1);

    this.search.end = new Date()

    this.startString = this.authService.isoDateToHtmlDate(this.search.start)
    this.endString = this.authService.isoDateToHtmlDate(this.search.end)
    this.refreshSearch()
  }

  refreshSearch() {
    this.search = new Search()

    if(this.startString) this.search.start = this.authService.HTMLDatetoIsoDate(this.startString)
    if(this.endString) this.search.end = this.authService.HTMLDatetoIsoDate(this.endString)

    this.searchMissions.forEach(el => { this.search.missionId = el._id })
    this.searchUsers.forEach(el => { this.search.userId = el._id })
    this.searchStrats.forEach(el => { this.search.stratId = el._id })
    this.searchProjects.forEach(el => { this.search.projectId = el._id })
    this.searchDocuments.forEach(el => { this.search.documentId = el._id })

    this.getResultAutocomplete.emit(this.search)
  }





}
