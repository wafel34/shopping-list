import { Injectable } from '@angular/core';
import { of, Observable } from 'rxjs';
import { IShoppingList } from 'src/app/shared/models/shopping-list/shopping-list';
import { HttpClient } from '@angular/common/http';
import { AngularFirestore, AngularFirestoreDocument, CollectionReference, AngularFirestoreCollection } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class ShoppingListRepositoryService {
 
  constructor(private httpService: HttpClient,  private fireStore: AngularFirestore) { }

  getList(id: string): Observable<IShoppingList> {
    const list: AngularFirestoreDocument<IShoppingList> = this.fireStore.doc(`lists/${id}`);

    return list.valueChanges();
  }

  getLists(userName: string): Observable<IShoppingList[]> {
    const shoppingLists: AngularFirestoreCollection<IShoppingList> = this.fireStore.collection('lists', (ref: CollectionReference) => {
        return ref.where('users', 'array-contains', userName);
    });

    return shoppingLists.valueChanges();
  }

  removeList(id: string): Observable<IShoppingList> {
    return this.httpService.delete<IShoppingList>(`shopping-lists/${id}`);
  }

}