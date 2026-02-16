import { Component, inject } from '@angular/core';
import { PaginationService } from './services/pagination.service';

@Component({
  selector: 'pg-paginator',
  imports: [],
  templateUrl: './paginator.html',
})
export class Paginator {
  public paginator = inject(PaginationService);
}
