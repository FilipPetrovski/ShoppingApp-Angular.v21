import { signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { ShoppingCartService } from '../shopping-cart/services/shopping-cart.service';
import { MockProduct } from './mocks/product.mock';
import { ProductsComponent } from './products.component';
import { ProductService } from './services/product.service';

describe('ProductsComponent Logic', () => {
  let component: ProductsComponent;
  let mockProductService: Partial<ProductService>;
  let mockCartService: Partial<ShoppingCartService>;

  beforeEach(() => {
    mockProductService = {
      searchTerm: signal(''),
      productsResource: {
        value: signal([]),
        isLoading: signal(false),
      } as any,
    };

    mockCartService = {
      addToCart: vi.fn(),
    };

    TestBed.configureTestingModule({
      providers: [
        ProductsComponent,
        { provide: ProductService, useValue: mockProductService },
        { provide: ShoppingCartService, useValue: mockCartService },
      ],
    });

    component = TestBed.inject(ProductsComponent);
  });

  describe('Search Logic', () => {
    it('should proxy the searchTerm signal from ProductService', () => {
      expect(component.searchTerm).toBe(mockProductService.searchTerm);
    });

    it('should update the service searchTerm when updateSearch is called', () => {
      const newValue = 'laptop';
      component.updateSearch(newValue);
      expect(mockProductService.searchTerm?.()).toBe(newValue);
    });
  });

  describe('Resource Logic', () => {
    it('should proxy the productsResource from ProductService', () => {
      expect(component.productsResource).toBe(mockProductService.productsResource);
    });
  });

  describe('Cart Actions', () => {
    it('should delegate addToCart to the ShoppingCartService', () => {
      component.onAddToCart(MockProduct);

      expect(mockCartService.addToCart).toHaveBeenCalledWith(MockProduct);
    });
  });
});
