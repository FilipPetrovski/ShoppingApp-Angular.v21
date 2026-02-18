import { signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Paginator } from './paginator';
import { PaginationService } from './services/pagination.service';

describe('PaginatorComponent', () => {
  let component: Paginator;
  let fixture: ComponentFixture<Paginator>;
  let mockService: Partial<PaginationService>;

  beforeEach(async () => {
    mockService = {
      currentPage: signal(1),
      totalPages: signal(5),
      totalItems: signal(50),
      nextPage: vi.fn(() => 'nextPage'),
      prevPage: vi.fn(() => 'prevPage'),
    };

    await TestBed.configureTestingModule({
      imports: [Paginator],
      providers: [{ provide: PaginationService, useValue: mockService }],
    }).compileComponents();

    fixture = TestBed.createComponent(Paginator);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should call service.nextPage() when onNextPage is triggered', () => {
    component.onNextPage();
    expect(mockService.nextPage).toHaveBeenCalled();
  });

  it('should reflect signal values from the service', () => {
    expect(component.currentPage()).toBe(1);
    expect(component.totalPages()).toBe(5);
  });
});
