import { computed, signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { ShoppingCartService } from './services/shopping-cart.service';
import { ShoppingCartComponent } from './shopping-cart.component';

describe('ShoppingCartComponent', () => {
  let component: ShoppingCartComponent;
  let mockService: Partial<ShoppingCartService>;

  beforeEach(() => {
    const isCartOpenSignal = signal(true);
    const itemsSignal = signal<any>([]);
    const countSignal = computed(() => itemsSignal().length);
    const totalSignal = computed(() => 0);

    mockService = {
      isCartOpen: isCartOpenSignal,
      items: itemsSignal as any,
      count: countSignal,
      total: totalSignal,
      updateQuantity: vi.fn(),
      removeFromCart: vi.fn(),
    };

    TestBed.configureTestingModule({
      providers: [ShoppingCartComponent, { provide: ShoppingCartService, useValue: mockService }],
    });

    component = TestBed.inject(ShoppingCartComponent);
  });

  describe('Getters', () => {
    it('should proxy signals from the service', () => {
      expect(component.isCartOpen).toBe(mockService.isCartOpen);
      expect(component.items).toBe(mockService.items);
      expect(component.count).toBe(mockService.count);
      expect(component.total).toBe(mockService.total);
    });

    it('should reflect changes in service signals', () => {
      expect(component.isCartOpen()).toBe(true);
      (mockService.isCartOpen as any).set(false);
      expect(component.isCartOpen()).toBe(false);
    });
  });

  describe('Actions', () => {
    it('should update service.isCartOpen when closeCart is called', () => {
      component.closeCart();
      expect(mockService.isCartOpen?.()).toBe(false);
    });

    it('should delegate updateQuantity to the service', () => {
      const productId = 'p123';
      const delta = 1;

      component.updateQuantity(productId, delta);

      expect(mockService.updateQuantity).toHaveBeenCalledWith(productId, delta);
    });

    it('should delegate removeItem to the service', () => {
      const productId = 'p123';

      component.removeItem(productId);

      expect(mockService.removeFromCart).toHaveBeenCalledWith(productId);
    });
  });
});
