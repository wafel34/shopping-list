import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShoppingListDetailComponent } from './components/shopping-list-detail/shopping-list-detail.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { RouterModule } from '@angular/router';
import { ShoppingListItemComponent } from './components/shopping-list-item/shopping-list-item.component';
import { ShoppingListsComponent } from './components/shopping-lists/shopping-lists.component';
import { ShoppingListsPageComponent } from './pages/shopping-lists-page/shopping-lists-page.component';


@NgModule({
  declarations: [
    ShoppingListDetailComponent,
    ShoppingListItemComponent,
    ShoppingListsComponent,
    ShoppingListsPageComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule
  ],
  providers: []
})
export class ShoppingListsModule { }
