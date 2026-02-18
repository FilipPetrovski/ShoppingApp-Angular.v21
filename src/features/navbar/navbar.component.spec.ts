import { signal, WritableSignal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { ShoppingCartService } from '../shopping-cart/services/shopping-cart.service';
import { NavbarComponent } from './navbar.component';

describe('NavbarComponent', () => {
  let component: NavbarComponent;

  let mockCount: WritableSignal<number>;
  let mockIsCartOpen: WritableSignal<boolean>;
  let mockService: Partial<ShoppingCartService>;

  beforeEach(async () => {
    mockCount = signal(0);
    mockIsCartOpen = signal(false);

    mockService = {
      count: mockCount,
      isCartOpen: mockIsCartOpen,
      // This is a replacement for jasmine.createSpy -> vi.fn()
      updateQuantity: vi.fn(),
      removeFromCart: vi.fn(),
    };

    await TestBed.configureTestingModule({
      imports: [NavbarComponent],
      providers: [provideRouter([]), { provide: ShoppingCartService, useValue: mockService }],
    }).compileComponents();

    const fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
  });

  describe('Menu State Logic', () => {
    it('should toggle isMenuOpen correctly', () => {
      expect(component.isMenuOpen()).toBeFalsy();
      component.toggleMenu();
      expect(component.isMenuOpen()).toBeTruthy();
    });
  });

  describe('Cart Interaction Logic', () => {
    it('should reflect the cart count from the service signal', () => {
      mockCount.set(10);
      expect(component.cartCount()).toBe(10);
    });

    it('should open the cart via the ShoppingCartService signal', () => {
      component.openCart();
      expect(mockIsCartOpen()).toBeTruthy();
    });
  });
});
