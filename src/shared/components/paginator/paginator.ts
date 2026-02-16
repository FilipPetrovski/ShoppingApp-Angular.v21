import { Component, inject } from '@angular/core';
import { PaginationService } from './services/pagination.service';

@Component({
  selector: 'pg-paginator',
  standalone: true,
  imports: [],
  templateUrl: './paginator.html',
})
export class Paginator {
  private paginationService = inject(PaginationService);

  currentPage = this.paginationService.currentPage;
  totalPages = this.paginationService.totalPages;
  totalItems = this.paginationService.totalItems;

  onPrevPage(): void {
    this.paginationService.prevPage();
  }

  onNextPage(): void {
    this.paginationService.nextPage();
  }
}
