import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { Search } from '../../shared/shared.model';



import {Router} from '@angular/router';

@Component({
  selector: 'app-sort',
  templateUrl: './sort.component.html',
  styleUrls: ['./sort.component.css']
})

export class SortComponent implements OnInit {
  @Input() search: Search = new Search;
  @Input() filedToOrder: string = '';
  @Output() orderBy: EventEmitter<any> = new EventEmitter();

  constructor(
    // private authService: AuthService,
    // private router: Router,
  ) {}

  orderByEvent(orderBy: string) {
    this.search.orderBy = orderBy;
    this.orderBy.emit(orderBy)
  }
  ngOnInit() {}


}
