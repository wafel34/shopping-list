import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShoppingListDetailComponent } from './components/shopping-list-detail/shopping-list-detail.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { RouterModule } from '@angular/router';
import { ShoppingListItemComponent } from './components/shopping-list-item/shopping-list-item.component';


@NgModule({
  declarations: [ShoppingListDetailComponent, ShoppingListItemComponent],
  imports: [
    CommonModule,
    SharedModule
  ],
  providers: []
})
export class ShoppingListsModule { }
