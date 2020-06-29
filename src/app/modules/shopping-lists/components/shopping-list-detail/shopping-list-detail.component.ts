import { Component, OnInit } from '@angular/core';
import { ShoppingListService } from 'src/app/core/services/shopping-list/shopping-list.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'
import { IShoppingList } from 'src/app/shared/models/shopping-list/shopping-list';
import { IShoppingListItem } from 'src/app/shared/models/shopping-list/shopping-list-item';
import { isNgTemplate } from '@angular/compiler';
import { IShoppingListGroupped } from 'src/app/shared/models/shopping-list/shopping-list-groupped';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-shopping-list-detail',
  templateUrl: './shopping-list-detail.component.html',
  styleUrls: ['./shopping-list-detail.component.scss']
})
export class ShoppingListDetailComponent {
  shoppingList$: Observable<IShoppingListGroupped> = this.shoppingListService.getSingleList(this.router.snapshot.params.id).pipe(
    map<IShoppingList, IShoppingListGroupped>(shoppingList => {
      const groups = shoppingList.items.reduce((group, currentItem) => {
        const currentGroup = group.find(item => item.group === currentItem.store);
        if (currentGroup) {
          currentGroup.items.push(currentItem);
        } else {
          group.push({
            group: currentItem.store,
            items: [currentItem]
          });
        }
        return group;
      }, []);
      return {
        groups: groups
      };
    })
  )

  constructor(private shoppingListService: ShoppingListService, private router: ActivatedRoute) {
  }

  onItemRemovedFromList(item: IShoppingListItem) {
    this.shoppingListService.archiveListItem(item);
  }

  onItemReAddedToTheList(item: IShoppingListItem) {
    console.log(item);
  }

}
