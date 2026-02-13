import { TestBed } from '@angular/core/testing';

import { ShoppingCartService } from '../../../shared/service/shopping-cart/shopping-cart.service';

describe('ShoppingCartService', () => {
  let service: ShoppingCartService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShoppingCartService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
