import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ApplicationRef, provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { PaginationService } from '../../../shared/components/paginator/services/pagination.service';
import { ProductService } from './product.service';

describe('ProductService', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    TestBed.resetTestingModule();
    vi.useRealTimers();
  });

  it('should reset current page when search term changes', () => {
    TestBed.configureTestingModule({
      providers: [
        ProductService,
        PaginationService,
        provideHttpClient(),
        provideHttpClientTesting(),
        provideZonelessChangeDetection(),
      ],
    });

    const service = TestBed.inject(ProductService);
    const paginationService = TestBed.inject(PaginationService);
    const appRef = TestBed.inject(ApplicationRef);

    paginationService.currentPage.set(5);
    service.searchTerm.set('laptop');
    appRef.tick();

    expect(paginationService.currentPage()).toBe(1);
  });
});
