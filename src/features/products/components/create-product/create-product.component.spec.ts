import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { of } from 'rxjs';
import { MockProduct } from '../../mocks/product.mock';
import { ProductService } from '../../services/product.service';
import { CreateProductComponent, INITIAL_PRODUCT_FORM } from './create-product.component';

describe('CreateProductComponent', () => {
  let component: CreateProductComponent;
  let productServiceMock: Partial<ProductService>;

  beforeEach(async () => {
    productServiceMock = {
      createProduct: vi.fn().mockReturnValue(of(MockProduct)),
    };

    await TestBed.configureTestingModule({
      imports: [CreateProductComponent],
      providers: [provideRouter([])],
    })
      .overrideComponent(CreateProductComponent, {
        set: { providers: [{ provide: ProductService, useValue: productServiceMock }] },
      })
      .compileComponents();

    const fixture = TestBed.createComponent(CreateProductComponent);
    component = fixture.componentInstance;
  });

  describe('Form Validation', () => {
    it('should initialize with an invalid form due to required fields', () => {
      expect(component.productForm().valid()).toBe(false);
    });

    it('should become valid when required fields are met and constraints pass', () => {
      component.productModel.set({
        ...INITIAL_PRODUCT_FORM,
        title: 'New Phone',
        thumbnail: 'image.jpg',
        price: 100,
        stock: 10,
      });

      expect(component.productForm().valid()).toBe(true);
    });

    it('should be invalid if price is 0 or negative', () => {
      component.productModel.update((p) => ({
        ...p,
        title: 'Valid',
        thumbnail: 'Valid',
        price: 0,
      }));
      expect(component.productForm().valid()).toBe(false);
    });
  });

  describe('Image Gallery Logic', () => {
    it('should add a base64 string to images signal when onFileChange is triggered', () => {
      const mockResult = 'data:image/png;base64,123';
      const dummyFile = new File([''], 'test.png', { type: 'image/png' });

      vi.stubGlobal(
        'FileReader',
        vi.fn().mockImplementation(function () {
          return {
            readAsDataURL: function (this: any) {
              if (this.onload) {
                this.onload({ target: { result: mockResult } });
              }
            },
          };
        }),
      );

      const event = {
        target: {
          files: [dummyFile],
          value: 'test',
        },
      } as any;

      component.onFileChange(event);

      expect(component.productModel().images).toContain(mockResult);
      expect(event.target.value).toBe('');

      vi.unstubAllGlobals();
    });

    it('should remove an image by index', () => {
      component.productModel.update((p) => ({ ...p, images: ['img1', 'img2'] }));
      component.removeImage(0);
      expect(component.productModel().images).toEqual(['img2']);
    });
  });

  describe('Save Logic', () => {
    it('should call createProduct and update the product signal on success', async () => {
      component.productModel.set({
        ...INITIAL_PRODUCT_FORM,
        title: 'Title',
        thumbnail: 'Thumb',
        price: 50,
        stock: 10,
      });

      await Promise.resolve();
      expect(component.productForm().valid()).toBe(true);

      component.saveProduct();

      const fixture = TestBed.createComponent(CreateProductComponent);
      await fixture.whenStable();

      expect(component.product()).toEqual(MockProduct);
    });

    it('should not call service if form is invalid', async () => {
      component.saveProduct();

      await Promise.resolve();
      expect(productServiceMock.createProduct).not.toHaveBeenCalled();
    });
  });
});
