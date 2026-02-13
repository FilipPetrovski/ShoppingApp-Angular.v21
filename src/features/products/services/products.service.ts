import { Injectable, effect, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { rxResource } from '@angular/core/rxjs-interop';
import { map, tap } from 'rxjs';
import { Product } from '../models/product.class';
import { PaginationService } from '../../../shared/paginated-response/services/paginated-response.service';
import { PaginatedResponse } from '../../../shared/paginated-response/models/paginated-response.interface';
import { debouncedSignal } from '../utils/search-term';

@Injectable({ providedIn: 'root' })
export class ProductService {
  private http = inject(HttpClient);
  public paginator = inject(PaginationService);

  searchTerm = signal('');
  private debouncedSearch = debouncedSignal(this.searchTerm, 500);

  constructor() {
    this.paginator.pageSize.set(20);

    effect(() => {
      this.searchTerm();
      this.paginator.currentPage.set(1);
    });
  }

  productsResource = rxResource({
    defaultValue: [] as Product[],

    params: () => ({
      limit: this.paginator.pageSize(),
      skip: this.paginator.skip(),
      query: this.debouncedSearch(),
    }),

    stream: (params) => {
      const { query, limit, skip } = params.params;

      const baseUrl = 'https://dummyjson.com/products' + (query ? '/search' : '');

      const queryParams = query
        ? `q=${query}&limit=${limit}&skip=${skip}`
        : `limit=${limit}&skip=${skip}`;

      return this.http.get<PaginatedResponse<Product>>(`${baseUrl}?${queryParams}`).pipe(
        tap((res) => this.paginator.setTotal(res.total)),
        map((res) => res.products.map((p) => new Product(p))),
      );
    },
  });
}
