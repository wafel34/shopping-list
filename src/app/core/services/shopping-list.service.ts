import { Injectable } from '@angular/core';
import { ShoppingListRepositoryService } from '../repositories/shopping-list/shopping-list-repository.service';
import {  BehaviorSubject, Observable } from 'rxjs';
import { IShoppingList } from 'src/app/shared/models/shopping-list/shopping-list';
import { IShoppingListItem } from 'src/app/shared/models/shopping-list/shopping-list-item';

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService {
  private singleList = new BehaviorSubject<IShoppingList>(null);

  readonly singleList$ = this.singleList.asObservable();
  constructor(private shoppingListRepository: ShoppingListRepositoryService) {

  }

  getSingleList(): Observable<IShoppingList> {
    const result =  this.shoppingListRepository.getList('');

    result.subscribe(list => this.setSingleListValue(list));

    return result;
  }

  archiveListItem(item: IShoppingListItem) {
    item.status = 'archived';
    const newArr = [
      ...this.getSingleListValue().items.filter(listItem => listItem.id !== item.id),
      item
    ];

    const newOb = {
      status: this.getSingleListValue().status,
      items: newArr
    };

    this.setSingleListValue(newOb);
  }

  private getSingleListValue() {
    return this.singleList.value;
  }

  private setSingleListValue(value) {
    this.singleList.next(value);
  }
}
