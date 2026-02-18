import { TestBed } from '@angular/core/testing';
import { beforeEach, describe, expect, it } from 'vitest';
import { MockProduct } from '../../products/mocks/product.mock';
import { Product } from '../../products/models/product.class';
import { ShoppingCartService } from './shopping-cart.service';

describe('ShoppingCartService', () => {
  let service: ShoppingCartService;

  const createProduct = (id: string, price: number, discount = 0) =>
    new Product({
      id,
      title: `Product ${id}`,
      description: '',
      price,
      discountPercentage: discount,
      stock: 10,
      thumbnail: '',
      images: [],
    });

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [ShoppingCartService] });
    service = TestBed.inject(ShoppingCartService);
  });

  describe('Initialization', () => {
    it('should start with an empty cart and closed state', () => {
      expect(service.items()).toEqual([]);
      expect(service.count()).toBe(0);
      expect(service.total()).toBe(0);
      expect(service.isCartOpen()).toBe(false);
    });
  });

  describe('addToCart()', () => {
    it('should add the MockProduct to the cart', () => {
      service.addToCart(MockProduct);

      expect(service.items().length).toBe(1);
      expect(service.items()[0].quantity).toBe(1);
      expect(service.items()[0].product.id).toBe(MockProduct.id);
      expect(service.count()).toBe(1);
    });

    it('should increment quantity if MockProduct is added twice', () => {
      service.addToCart(MockProduct);
      service.addToCart(MockProduct);

      expect(service.items().length).toBe(1);
      expect(service.items()[0].quantity).toBe(2);
      expect(service.count()).toBe(2);
    });
  });

  describe('updateQuantity()', () => {
    it('should increase and decrease quantity of MockProduct correctly', () => {
      service.addToCart(MockProduct);

      service.updateQuantity(MockProduct.id, 2);
      expect(service.items()[0].quantity).toBe(3);

      service.updateQuantity(MockProduct.id, -1);
      expect(service.items()[0].quantity).toBe(2);
    });

    it('should never allow MockProduct quantity to drop below 1', () => {
      service.addToCart(MockProduct);
      service.updateQuantity(MockProduct.id, -10);

      expect(service.items()[0].quantity).toBe(1);
    });
  });

  describe('Computed Signals (total & count)', () => {
    it('should calculate total price based on product discount logic', () => {
      const p2 = createProduct('p2', 50, 0);

      service.addToCart(MockProduct);
      service.addToCart(MockProduct);
      service.addToCart(p2);

      expect(service.count()).toBe(3);
      expect(service.total()).toBe(68);
    });

    it('should update total immediately when MockProduct quantity changes', () => {
      service.addToCart(MockProduct);
      expect(service.total()).toBe(9);

      service.updateQuantity(MockProduct.id, 1);
      expect(service.total()).toBe(18);
    });
  });

  describe('Removal and Cleanup', () => {
    it('should remove MockProduct from the cart', () => {
      const p2 = createProduct('p2', 100);
      service.addToCart(MockProduct);
      service.addToCart(p2);

      service.removeFromCart(MockProduct.id);

      expect(service.items().length).toBe(1);
      expect(service.items()[0].product.id).toBe('p2');
    });

    it('should clear all items and reset totals', () => {
      service.addToCart(MockProduct);
      service.clearCart();

      expect(service.items()).toEqual([]);
      expect(service.total()).toBe(0);
      expect(service.count()).toBe(0);
    });
  });
});
