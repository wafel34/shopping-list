import { Component, OnInit } from '@angular/core';
import { ShoppingListService } from 'src/app/core/services/shopping-list/shopping-list.service';

@Component({
  selector: 'app-shopping-lists',
  templateUrl: './shopping-lists.component.html',
  styleUrls: ['./shopping-lists.component.scss']
})
export class ShoppingListsComponent {
  shoppingLists$ = this.shoppingListService.getShoppingLists('testUser');

  constructor(private shoppingListService: ShoppingListService) { }

  onListRemove(listId: string) {
    this.shoppingListService.removeList(listId)
    .subscribe(() => {})

  }

}
