import { computed, Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class PaginationService {
  currentPage = signal<number>(1);
  pageSize = signal<number>(10);
  totalItems = signal<number>(0);

  skip = computed(() => (this.currentPage() - 1) * this.pageSize());
  totalPages = computed(() => Math.ceil(this.totalItems() / this.pageSize()));

  nextPage() {
    if (this.currentPage() < this.totalPages()) this.currentPage.update((n) => n + 1);
  }

  prevPage() {
    if (this.currentPage() > 1) this.currentPage.update((n) => n - 1);
  }

  setTotal(total: number) {
    this.totalItems.set(total);
  }
}
