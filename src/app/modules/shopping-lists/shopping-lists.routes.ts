import { Routes } from '@angular/router';
import { ShoppingListDetailComponent } from './components/shopping-list-detail/shopping-list-detail.component';
import { ShoppingListsPageComponent } from './pages/shopping-lists-page/shopping-lists-page.component';

export const SHOPPING_LISTS_ROUTES: Routes = [
    {
        path: '',
        component: ShoppingListsPageComponent
    },
    {
        path: ':id',
        component: ShoppingListDetailComponent,
    }
];