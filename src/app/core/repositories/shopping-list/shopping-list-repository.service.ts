import { Injectable } from '@angular/core';
import { of, Observable, from } from 'rxjs';
import { IShoppingList } from 'src/app/shared/models/shopping-list/shopping-list';
import { HttpClient } from '@angular/common/http';
import { AngularFirestore, AngularFirestoreDocument, CollectionReference, AngularFirestoreCollection, DocumentReference } from '@angular/fire/firestore';

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

  updateList(id: string, list: IShoppingList) {
    console.log('update')
    const shoppingLists: AngularFirestoreCollection<IShoppingList> = this.fireStore.collection('lists');
    shoppingLists.doc(id).update(list);
  }

  createList(userId: string, list: any): Observable<DocumentReference> {
    const shoppingLists: AngularFirestoreCollection<IShoppingList> = this.fireStore.collection('lists');

    return from(shoppingLists.add({...list, users: [userId]}));
  }

  removeList(id: string) {
  }

}