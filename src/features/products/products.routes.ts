import { Routes } from '@angular/router';

export const PRODUCT_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => import('./products.component').then((c) => c.ProductsComponent),
  },
  {
    path: 'create',
    loadComponent: () =>
      import('./components/create-product/create-product.component').then(
        (c) => c.CreateProductComponent,
      ),
  },
];
