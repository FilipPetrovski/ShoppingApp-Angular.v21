import { Routes } from '@angular/router';
import { AboutUsComponent } from '../features/about-us/about-us.component';
import { ContactUsComponent } from '../features/contact-us/contact-us.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'products',
    pathMatch: 'full',
  },
  {
    path: 'products',
    loadComponent: () =>
      import('../features/products/products.component').then((c) => c.ProductsComponent),
  },
  { path: 'about', component: AboutUsComponent },
  { path: 'contact', component: ContactUsComponent },
];
