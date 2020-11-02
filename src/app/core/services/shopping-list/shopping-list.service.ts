import { Injectable } from '@angular/core';
import { ShoppingListRepositoryService } from '../../repositories/shopping-list/shopping-list-repository.service';
import {  BehaviorSubject, Observable } from 'rxjs';
import { IShoppingList } from 'src/app/shared/models/shopping-list/shopping-list';
import { IShoppingListItem } from 'src/app/shared/models/shopping-list/shopping-list-item';
import { AngularFireAuth } from '@angular/fire/auth';
import { switchMap, take } from 'rxjs/operators';
import { IUser } from 'src/app/shared/models/user/user';
import { DocumentReference } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService {
  private singleList = new BehaviorSubject<IShoppingList>(null);

  readonly singleList$ = this.singleList.asObservable();
  constructor(
    private shoppingListRepository: ShoppingListRepositoryService,
    private angularFireAuth: AngularFireAuth  
  ) {

  }

  getSingleList(id: string): Observable<IShoppingList> {
    const result =  this.shoppingListRepository.getList(id);

    result.subscribe(list => this.setSingleListValue(list));

    return result;
  }

  archiveListItem(item: IShoppingListItem) {
  }

  getShoppingLists(userName: string): Observable<IShoppingList[]> {
    return this.shoppingListRepository.getLists(userName);
  }

  createList(list: IShoppingList): Observable<DocumentReference> {
    return this.angularFireAuth.authState.pipe(
      take(1),
      switchMap((user: IUser) => this.shoppingListRepository.createList(user.uid, list))
    );
  }

  removeList(id: string) {
    return this.shoppingListRepository.removeList(id)
  }

  updateList(id: string, list: IShoppingList) {
    return this.shoppingListRepository.updateList(id, list);
  }

  private getSingleListValue() {
    return this.singleList.value;
  }

  private setSingleListValue(value) {
    this.singleList.next(value);
  }
}
