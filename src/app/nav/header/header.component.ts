import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {AuthService} from '../../auth/auth.service';
import { Location } from '@angular/common';
import {Router} from '@angular/router';
import { TranslateService } from '../../translate/translate.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Input() search: any;
  @Input() nameObject: String = '';
  @Input() title: String = '';
  @Input() nameButton: String = '';
  @Input() option: String = '';
  @Input() showBackButton: Boolean = true;
  @Input() openInDialog: Boolean = false;
  @Input() showHeader: Boolean = true;
  @Input() showCreateButton: Boolean = true;
  @Input() idProject: string= '';
  @Input() idClient: string= '';
  @Output() saved: EventEmitter<any> = new EventEmitter();




  nameObjectPlur: String= ''
  nameObjectSing: String= ''

  constructor(
    private authService: AuthService,
    private router: Router,
    private location: Location,
    private translateService: TranslateService,
  ) {}


  ngOnInit() {

    // this.translateService.use(this.authService.getLanguage());
    this.nameObjectSing = this.translateService.instant(<string>this.nameObject)
    this.nameObjectPlur = this.translateService.instant(<string>this.nameObject)

    if(this.nameObject === 'expense')
      this.nameObjectPlur = this.translateService.instant('Expenses')
    if(this.nameObject === 'product')
      this.nameObjectPlur = this.translateService.instant('Products')
    if(this.nameObject === 'quote')
      this.nameObjectPlur = this.translateService.instant('Quotes')
    if(this.nameObject === 'project')
      this.nameObjectPlur = this.translateService.instant('Projects')
    if(this.nameObject === 'paiementQuote')
      this.nameObjectPlur = this.translateService.instant('Paiements')
    if(this.nameObject === 'companie')
      this.nameObjectPlur = this.translateService.instant('Companies')
    if(this.nameObject === 'userCalendar')
      this.nameObjectPlur = this.translateService.instant('Calendar')
    if(this.nameObject === 'right')
      this.nameObjectPlur = this.translateService.instant('Rights')
    if(this.nameObject === 'task')
      this.nameObjectPlur = this.translateService.instant('Tasks')
    if(this.nameObject === 'user') {
      this.nameObjectPlur = this.translateService.instant('Users')
      if(this.option === 'internal')
        this.nameButton = this.translateService.instant('Create a new team member')
      if(this.option === 'external')
        this.nameButton = this.translateService.instant('Create a new external contact')
    }

    if(!this.nameButton)
      this.nameButton = this.translateService.instant('Create a new') + ' ' + this.translateService.instant(<string>this.nameObjectSing)

  }
  redirectCreateObj() {

      let queryParams = {}
      if(this.nameObject === 'product')
        this.router.navigate(['product/productSingle/']);
      if(this.nameObject === 'quote') {

        if(this.idProject) {queryParams['idProject'] = this.idProject}
        if(this.idClient) {queryParams['idClient'] = this.idClient}
        this.router.navigate(['/quote/new/' , queryParams]);

      }

      if(this.nameObject === 'paiementQuote')
        this.router.navigate(['/paiementQuote/new/']);
      if(this.nameObject === 'companie')
        this.router.navigate(['/companie/new/']);
      if(this.nameObject === 'right')
        this.router.navigate(['/right/new/']);
      if(this.nameObject === 'project')
        this.router.navigate(['/project/new/']);
      if(this.nameObject === 'task')
        this.router.navigate(['/project/tasks/new/']);

      if(this.nameObject === 'expense')
        this.router.navigate(['/expense/new/']);


      if(this.nameObject === 'user') {
        if(this.option === 'internal')
          this.router.navigate(['/user/new/']);
        if(this.option === 'external')
          this.router.navigate(['/user/new/']);
      }

  }
  goBack() {
    this.location.back();
  }
  savedF(result) {
    this.saved.emit(result)
  }
}
