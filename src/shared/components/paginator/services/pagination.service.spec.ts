import { TestBed } from '@angular/core/testing';
import { PaginationService } from './pagination.service';

describe('PaginationService', () => {
  let service: PaginationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PaginationService);
  });

  it('should calculate totalPages correctly', () => {
    service.setTotal(25);
    expect(service.totalPages()).toBe(3);
  });

  it('should increment page on nextPage()', () => {
    service.setTotal(20);
    service.nextPage();
    expect(service.currentPage()).toBe(2);
  });

  it('should not exceed totalPages', () => {
    service.setTotal(10);
    service.nextPage();
    expect(service.currentPage()).toBe(1);
  });

  it('should calculate skip correctly', () => {
    service.setTotal(30);
    service.currentPage.set(3);
    expect(service.skip()).toBe(20);
  });
});
