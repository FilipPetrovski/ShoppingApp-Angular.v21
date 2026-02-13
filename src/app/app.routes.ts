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
        loadChildren: () =>
            import('../features/products/products.routes').then((c) => c.PRODUCT_ROUTES),
    },
    { path: 'about', component: AboutUsComponent },
    { path: 'contact', component: ContactUsComponent },
];
