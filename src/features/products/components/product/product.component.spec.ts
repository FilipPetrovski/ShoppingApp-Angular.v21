import { outputToObservable } from '@angular/core/rxjs-interop';
import { TestBed } from '@angular/core/testing';
import { firstValueFrom } from 'rxjs';
import { MockProduct } from '../../mocks/product.mock';
import { ProductComponent } from './product.component';

describe('ProductComponent', () => {
  let component: ProductComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductComponent],
    }).compileComponents();

    const fixture = TestBed.createComponent(ProductComponent);
    component = fixture.componentInstance;

    fixture.componentRef.setInput('product', MockProduct);
    fixture.detectChanges();
  });

  describe('Outputs & Actions', () => {
    it('should emit the product when onAddToCartClick is called', async () => {
      const addToCart$ = outputToObservable(component.addToCart);
      const emission = firstValueFrom(addToCart$);

      component.onAddToCartClick();

      const emittedProduct = await emission;
      expect(emittedProduct).toBe(MockProduct);
      expect(emittedProduct.getFinalPrice()).toBe(9);
    });

    it('should call emit exactly once per click', () => {
      const spy = vi.spyOn(component.addToCart, 'emit');

      component.onAddToCartClick();

      expect(spy).toHaveBeenCalledTimes(1);
      expect(spy).toHaveBeenCalledWith(MockProduct);
    });
  });
});
