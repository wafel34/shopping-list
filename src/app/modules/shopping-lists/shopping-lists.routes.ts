import { Routes } from '@angular/router';
import { ShoppingListDetailComponent } from './components/shopping-list-detail/shopping-list-detail.component';

export const SHOPPING_LISTS_ROUTES: Routes = [
    {
        path: '',
        redirectTo: '1',
        pathMatch: 'full'
    },
    {
        path: '1',
        component: ShoppingListDetailComponent,
    }
];