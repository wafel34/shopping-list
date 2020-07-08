import { Routes } from '@angular/router';
import { HomepageComponent } from './modules/home/pages/homepage/homepage.component';

import { HOME_ROUTES } from './modules/home/home.routes';
import { LayoutDefaultComponent } from './shared/layout/layout-default/layout-default.component';
import { SHOPPING_LISTS_ROUTES } from './modules/shopping-lists/shopping-lists.routes';
import { AuthGuard } from './core/guards/auth.guard';

export const APP_ROUTES: Routes = [
    {
        path: '',
        component: LayoutDefaultComponent,
        children: HOME_ROUTES,
        pathMatch: 'full'
    },
    {
        path: 'shopping-lists',
        component: LayoutDefaultComponent,
        children: SHOPPING_LISTS_ROUTES,
        canActivate: [AuthGuard]
    }
];