import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'products',
    pathMatch: 'full',
  },
  {
    path: 'products',
    loadChildren: () =>
      import('../features/products/products.routes').then((c) => c.PRODUCT_ROUTES),
  },
  {
    path: 'about',
    loadComponent: () =>
      import('../features/about-project/about-project.component').then(
        (c) => c.AboutProjectComponent,
      ),
  },
  {
    path: 'contact',
    loadComponent: () =>
      import('../features/contact-me/contact-me.component').then((c) => c.ContactMeComponent),
  },
];
