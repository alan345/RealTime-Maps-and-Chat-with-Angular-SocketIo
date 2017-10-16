import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef, Injectable, NgModule } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { UserCalendarService } from '../userCalendar.service';

import { UserCalendar, SearchData } from '../userCalendar.model';
import { ToastsManager } from 'ng2-toastr';

import { MatDialog } from '@angular/material';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UserService } from '../../user/user.service';

import { DeleteDialog } from '../../deleteDialog/deleteDialog.component';
import { User } from '../../user/user.model';
import { Quote } from '../../quote/quote.model';
import { Product } from '../../product/product.model';
import { Project } from '../../project/project.model';


import { CalendarComponent } from 'ap-angular2-fullcalendar';

import { UserCalendarDialogComponent } from '../single/dialog/userCalendarDialog.component';
import { SearchCalendarComponent } from './search/searchCalendar.component';

// import * as $ from 'jquery';

@Component({
  selector: 'app-userCalendars',
  templateUrl: './userCalendars.component.html',
  styleUrls: ['../userCalendar.component.css'],
})
export class UserCalendarsComponent implements OnInit {
  // @Output() newUserCalendarSaved: EventEmitter<any> = new EventEmitter();
  // @Input() showHeader = true;
  @Input() fetchedQuote: Quote = new Quote()

  // @ViewChild('myCal', { read: ElementRef }) myCal: ElementRef;
  @ViewChild(CalendarComponent) myCalendar: CalendarComponent;
  @ViewChild(SearchCalendarComponent) private searchCalendarComponent: SearchCalendarComponent;


  isSearchInitReady: boolean = false
  fetchedUserCalendar: UserCalendar = new UserCalendar()
  // autocompleteUser: string = '';
  // autocompleteProject: string = '';
  // fetchedProducts: Product[] = []
  // fetchedProjects: Project[] = []
  currentUser: User = new User()
  // imgLogoUrl: string = './assets/images/profile-placeholder.jpg'
  // imgSignatureBase64Temp = ''
  // userAdmins : User[] = []
  // userManagers : User[] = []
  // userClients : User[] = []
  // usersSalesRep : User[] = []
  // userStylists : User[] = []
  searchData: SearchData = new SearchData()
  search = {
    typeUser: '',
    // clientSearch: '',
    userSearch: '',
    projectSearch: '',
    endDate: new Date(),
    startDate: new Date(),
  }
  // events: UserCalendar[] = []
  events: UserCalendar[] = []
  myForm: FormGroup;
  // autocompleteProduct: String = ''
  // fetchedUsers: User[] = [];
  // arrayContentToSearch = []

  // paiementsTypes = [
  //   { label: 'cheque', value: 'check' },
  //   { label: 'Espece', value: 'cash' }
  // ]

  // fetchedUserSearchs: User[] = [];

  loading: boolean = false;
  calendarOptions: {}


  constructor(
    private userService: UserService,
    private userCalendarService: UserCalendarService,
    private toastr: ToastsManager,
    public dialog: MatDialog,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private location: Location,
    private _fb: FormBuilder,
    private authService: AuthService,
  ) { }
  onCalendarInit(result) {
    this.searchCalendarComponent.calendarInitialized()

    // this.getUserCalendarsInit()
    // console.log('Calendar initialized');
  }

  getUserCalendarsInit() {
    // this.getUserCalendars(1, this.search)
  }
  ngOnInit() {
    let slotDuration = ''
    let timeBegin= ''
    let timeEnd = ''
    let timeBeginbusinessHours= ''
    let timeEndbusinessHours = ''


    this.currentUser = this.authService.getCurrentUser()
    this.currentUser.ownerCompanies.forEach(companie => {
      timeBegin = companie.option.calendar.timeBegin
      timeEnd = companie.option.calendar.timeEnd
      timeBeginbusinessHours = companie.option.calendar.timeBeginbusinessHours
      timeEndbusinessHours = companie.option.calendar.timeEndbusinessHours

      slotDuration = companie.option.calendar.slotDuration
    })
    if(!slotDuration) slotDuration = '00:30:00'
    if(!timeBegin) timeBegin = '06:00:00'
    if(!timeEnd) timeEnd = '19:00:00'



    this.calendarOptions = {
      timezone: 'local',
      height: 550,
      selectable: true,
      firstDay: 1,
      minTime: timeBegin,
      maxTime: timeEnd,
      slotDuration: slotDuration,
      locale: 'fr',
      slotLabelFormat: "HH:mm",
      allDaySlot: false,
      nowIndicator: true,
      businessHours: {
        dow: [1, 2, 3, 4, 5],
        start: timeBeginbusinessHours,
        end: timeEndbusinessHours,
      },
      header: {
        left: 'title',
        center: '',
        right: 'today prev,next month,agendaWeek,listWeek'
      },

      defaultView: 'agendaWeek',
      editable: true,
      eventLimit: true, // allow "more" link when too many events
      dayClick: this.dayClick.bind(this),
      eventClick: this.eventClick.bind(this),
      eventMouseover: this.eventMouseover.bind(this),
      eventMouseout: this.eventMouseout.bind(this),
      select: this.select.bind(this),
      unselect: this.unselect.bind(this),
      eventDragStart: this.eventDragStart.bind(this),
      eventDragStop: this.eventDragStop.bind(this),
      eventDrop: this.eventDrop.bind(this),
      eventResizeStart: this.eventResizeStart.bind(this),
      eventResizeStop: this.eventResizeStop.bind(this),
      eventResize: this.eventResize.bind(this),
      viewRender: this.viewRender.bind(this),
    };
    //   this.activatedRoute.params.subscribe((params: Params) => {
    //     // if(params['idUserSearch']) {this.getUserSearch(params['idUserSearch'])}
    //   // if(params['idProjectSearch']) {this.getProjectSearch(params['idProjectSearch'])}
    //   // if(params['idClientSearch']) {this.getClientSearch(params['idClientSearch'])}
    //   // if(params['typeUserSearch']) {this.selectTypeUser(params['typeUserSearch'])}
    // })
  }

  //   getUserSearch(id: string) {
  //   this.userService.getUser(id)
  //     .subscribe(
  //       res => {
  //         this.fetchedUserSearchs = [res]
  //       },
  //       error => { console.log(error) }
  //     )
  // }

  getUserCalendarBySearch(searchData: SearchData) {
    this.searchData = searchData
    this.isSearchInitReady = true
    this.resetSearchGetUserCalendars()
  }
  resetSearchGetUserCalendars() {
    this.search.typeUser = this.searchData.typeUser
    this.search.userSearch = ''
    this.search.projectSearch = ''
    this.searchData.fetchedUserSearchs.forEach(fetchedUserSearch => {
      this.search.userSearch = fetchedUserSearch._id
    });
    this.searchData.fetchedProjectSearchs.forEach(fetchedProjectSearch => {
      this.search.projectSearch = fetchedProjectSearch._id
    });
    // this.search.typeUser = searchData.search.typeUser
    // this.search.userSearch = searchData.search.userSearch
    // this.search.projectSearch = searchData.search.projectSearch

    this.getUserCalendars(1, this.search)
  }


  getUserCalendars(page: number, search: any) {
    this.loading = true;
    this.userCalendarService.getUserCalendars(page, search)
      .subscribe(
      res => {
        this.loading = false;
        this.events = []
        this.events = res.data
        this.events.forEach((event, i) => {
          // this.events[i].title = 'toto'



          event.clients.forEach((user, j) => {
            this.events[i].title = '';
            this.events[i].color = user.profile.colorCalendar
            this.events[i].title += user.profile.lastName + ' '+ user.profile.name + '  '
            user.profile.address.forEach(singleAddress => {
              this.events[i].title += singleAddress.zip
              this.events[i].title += ' ';
              this.events[i].title += singleAddress.city
            })
          });
        })
        this.updateCalendar()

      },
      error => {
        this.loading = false;
        console.log(error);
      }
      );
  }


  updateCalendar() {
    let dataSource = {
      id: 1,
      events: this.events
    }
    // $(this.myCal.nativeElement).fullCalendar('refetchEvents')
    this.myCalendar.fullCalendar('removeEventSources');
    this.myCalendar.fullCalendar('addEventSource', dataSource);

  }


  openDialog(userCalendar: UserCalendar) {
    // console.log(userCalendar)
    let dialogRef = this.dialog.open(UserCalendarDialogComponent, {
      data: {
        fetchedUserCalendar: userCalendar
      }
    });
    // dialogRef.componentInstance.fetchedUserCalendar = userCalendar;
    dialogRef.afterClosed().subscribe(result => {
      this.resetSearchGetUserCalendars()
      // this.getUserCalendars(1, this.search)
      // if(result) {
      //   this.fetchedCompanie.forms.push(result)
      // }
    })
  }

  saveSingleEvent(userCalendar: UserCalendar) {
    // console.log(userCalendar)
    if (userCalendar._id) {
      this.userCalendarService.updateUserCalendar(userCalendar)
        .subscribe(
        res => {
          this.toastr.success('Great!', res.message)
        },
        error => {
          this.toastr.error('error!', error)
        }
        )
    } else {
      this.userCalendarService.saveUserCalendar(userCalendar)
        .subscribe(
        res => {
          this.toastr.success('Great!', res.message)
        },
        error => { console.log(error) }
        )
    }
  }


  dayClick(event, jsEvent, view) {
    console.log('dayClick')
    // console.log(event, jsEvent, view )
  }
  eventClick(event, jsEvent, view) {
    this.openDialog(event)

    // console.log(event, jsEvent, view )
  }
  eventMouseover(event, jsEvent, view) {
    // console.log('eventMouseover')
    // console.log(event, jsEvent, view )
  }
  eventMouseout(event, jsEvent, view) {
    // console.log('eventMouseout')
    // console.log(event, jsEvent, view )
  }
  select(start, end, jsEvent, view) {
    // console.log(start._d)
    // console.log(new Date(start._d))
    // console.log(new Date(start._d).toISOString())
    let newUserCalendar = new UserCalendar()
    // newUserCalendar.clients = this.searchData.fetchedUserSearchs
    // newUserCalendar.projects = this.searchData.fetchedProjectSearchs
    //
    // console.log(this.searchData.fetchedProjectSearchs)
    newUserCalendar.start = start._d
    newUserCalendar.end = end._d
    this.openDialog(newUserCalendar)

  }
  unselect(event, jsEvent, view) {
    // console.log('unselect')
    // console.log(event, jsEvent, view )
  }
  eventDragStart(event, jsEvent, view) {
    // console.log('unselect')
    // console.log(event, jsEvent, view )
  }
  eventDragStop(event, jsEvent, view) {
    // console.log('unselect')
    // console.log(event, jsEvent, view )
  }
  eventDrop(event, delta, revertFunc, jsEvent, ui, view) {

    let extraMS: number = delta._milliseconds * 1 + delta._days * 24 * 60 * 60 * 1000
    let newUserCalendar: UserCalendar = this.events.find(x => x._id === event._id)
    newUserCalendar.start = new Date(new Date(newUserCalendar.start).getTime() + extraMS)
    newUserCalendar.end = new Date(new Date(newUserCalendar.end).getTime() + extraMS)
    this.saveSingleEvent(newUserCalendar)

  }
  viewRender(view, element) {
    this.search.startDate = view.activeRange.start
    this.search.endDate = view.activeRange.end
    if (this.isSearchInitReady)
      this.resetSearchGetUserCalendars()
    // this.getUserCalendars(1, this.search)
    // console.log(view)
  }
  eventResizeStart(event, jsEvent, view) {
    // console.log('unselect')
    // console.log(event, jsEvent, view )
  }
  eventResizeStop(event, jsEvent, view) {
    // console.log(event)
    // console.log(event, jsEvent, view )
  }
  eventResize(event, delta, revertFunc, jsEvent, ui, view) {
    let extraMS: number = delta._milliseconds * 1 + delta._days * 24 * 60 * 60 * 1000
    let newUserCalendar: UserCalendar = this.events.find(x => x._id === event._id)
    // newUserCalendar.start = new Date(new Date(newUserCalendar.start).getTime() + extraMS)
    newUserCalendar.end = new Date(new Date(newUserCalendar.end).getTime() + extraMS)
    this.saveSingleEvent(newUserCalendar)
  }





}
