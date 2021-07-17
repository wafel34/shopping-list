import { Injectable } from '@angular/core';
import {Observable, from, combineLatest} from 'rxjs';
import { IShoppingList } from 'src/app/shared/models/shopping-list/shopping-list';
import { HttpClient } from '@angular/common/http';
import { AngularFirestore, AngularFirestoreDocument, CollectionReference, AngularFirestoreCollection } from '@angular/fire/firestore';
import { firestore } from 'firebase';
import { map, take } from 'rxjs/operators';
import { IShoppingListItem } from '../../../shared/models/shopping-list/shopping-list-item';
import { IStore } from '../../../shared/models/stores/store';

@Injectable({
  providedIn: 'root'
})
export class ShoppingListRepositoryService {

  constructor(private httpService: HttpClient, private fireStore: AngularFirestore) { }

  getList(id: string): Observable<IShoppingList> {
    const list: AngularFirestoreDocument<IShoppingList> = this.fireStore.doc(`lists/${id}`);

    return list.valueChanges();
  }

  getLists(userName: string): Observable<IShoppingList[]> {
    const createdLists: AngularFirestoreCollection<IShoppingList> = this.fireStore.collection('lists', (ref: CollectionReference) => {
      return ref.where('creator', '==', userName);
    });
    const assignedLists: AngularFirestoreCollection<IShoppingList> = this.fireStore.collection('lists', (ref: CollectionReference) => {
      return ref.where('assignee', '==', userName);
    });


    return combineLatest([createdLists.valueChanges(), assignedLists.valueChanges()])
      .pipe(
        map(([createdResults, assignedResults]) => [...createdResults, ...assignedResults]
            // TODO: sort in firebase query
            .sort((resultA, resultB) => resultA.date > resultB.date ? -1 : 1))
      );
  }

  updateList(id: string, list: IShoppingList): Promise<void> {
    const shoppingLists: AngularFirestoreCollection<IShoppingList> = this.fireStore.collection('lists');
    return shoppingLists.doc(id).update(list);
  }

  createList(userId: string, list: any): Observable<void> {
    const documentId = this.fireStore.createId();
    const shoppingLists: AngularFirestoreCollection<IShoppingList> = this.fireStore.collection('lists');
    return from(shoppingLists.doc(documentId).set({
        ...list,
        creator: userId,
        date: firestore.Timestamp.now(),
        id: documentId
      }));
  }

  archiveListItem(item: IShoppingListItem, store: IStore, list: Observable<IShoppingList>) {
    list.pipe(
        take(1)
    )
        .subscribe(currentList => {
          const newList: IShoppingList = {...currentList};
          const newStore = newList.stores.find(currentStore => currentStore.name === store.name);

          newStore.items = newStore.items.filter(storeItem => {
            console.log( storeItem.name !== item.name);
            return storeItem.name !== item.name;
          });

          const document: AngularFirestoreDocument<IShoppingListItem> = this.fireStore.doc(`lists/${currentList.id}`);
          return document.update(newList).then(() => console.log(('updated'))).catch(() => console.log('error in shopping list'));
        });


  }

  removeList(id: string) {
  }

}
