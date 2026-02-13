import { Component, inject } from '@angular/core';
import { PaginationService } from '../../paginated-response/services/paginated-response.service';

@Component({
  selector: 'app-paginator',
  imports: [],
  templateUrl: './paginator.html',
  styleUrl: './paginator.css',
})
export class Paginator {
  public paginator = inject(PaginationService);
}
