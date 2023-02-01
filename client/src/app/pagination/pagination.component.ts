import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Pagination } from '../_interfaces/pagination';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit {
  @Input() pagination: Pagination;
  @Output() page = new EventEmitter();

  constructor() {}

  ngOnInit(): void {
  }

  nextPage() {
    this.changePage(this.pagination.currentPage+1);
  }

  previousPage() {
    this.changePage(this.pagination.currentPage-1);
  }

  changePage(page: number) {
    this.page.emit(page);
  }
}
