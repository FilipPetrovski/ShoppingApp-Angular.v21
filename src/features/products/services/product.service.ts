import { HttpClient } from '@angular/common/http';
import { effect, inject, Injectable, signal } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { map, Observable, tap } from 'rxjs';
import { PaginatedResponse } from '../../../shared/components/paginator/models/paginated-response.interface';
import { PaginationService } from '../../../shared/components/paginator/services/pagination.service';
import { Product } from '../models/product.class';
import { debouncedSignal } from '../utils/debounce-signal';

@Injectable()
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

  createProduct(product: Partial<Product>): Observable<Product> {
    return this.http
      .post('https://dummyjson.com/products/add', product)
      .pipe(map((res: any) => new Product(res)));
  }
}
