import { Routes } from '@angular/router';
import { ShoppingListDetailComponent } from './components/shopping-list-detail/shopping-list-detail.component';
import { ShoppingListsPageComponent } from './pages/shopping-lists-page/shopping-lists-page.component';
import { ShoppingListEditComponent } from './components/shopping-list-edit/shopping-list-edit.component';
import { ShoppingListAddComponent } from './components/shopping-list-add/shopping-list-add.component';

export const SHOPPING_LISTS_ROUTES: Routes = [
    {
        path: 'add',
        component: ShoppingListAddComponent
    },
    {
        path: ':id/edit',
        component: ShoppingListEditComponent,
    },
    {
        path: ':id',
        component: ShoppingListDetailComponent,
    },
    {
        path: '',
        component: ShoppingListsPageComponent
    }
];