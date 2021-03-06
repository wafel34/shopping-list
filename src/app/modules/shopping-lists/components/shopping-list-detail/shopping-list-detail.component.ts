import { Component } from '@angular/core';
import { ShoppingListService } from 'src/app/core/services/shopping-list/shopping-list.service';
import { Observable } from 'rxjs';
import { IShoppingList } from 'src/app/shared/models/shopping-list/shopping-list';
import { IShoppingListItem } from 'src/app/shared/models/shopping-list/shopping-list-item';
import { ActivatedRoute } from '@angular/router';
import { IStore } from '../../../../shared/models/stores/store';

@Component({
  selector: 'app-shopping-list-detail',
  templateUrl: './shopping-list-detail.component.html',
  styleUrls: ['./shopping-list-detail.component.scss']
})
export class ShoppingListDetailComponent {
  shoppingList$: Observable<IShoppingList> = this.shoppingListService.getSingleList(this.router.snapshot.params.id);
  private timeout: number;

  constructor(private shoppingListService: ShoppingListService, private router: ActivatedRoute) {
  }

  onItemRemovedFromList(item: IShoppingListItem, store: IStore) {
    this.timeout = setTimeout(() => {
      this.shoppingListService.archiveListItem(item, store, this.shoppingList$);
    }, 2000);
  }

  onItemReAddedToTheList() {
    console.log('item re-added');
    clearTimeout(this.timeout);
  }

}
