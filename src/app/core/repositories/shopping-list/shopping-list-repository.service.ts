import { Injectable } from '@angular/core';
import {Observable, from, combineLatest} from 'rxjs';
import { IShoppingList } from 'src/app/shared/models/shopping-list/shopping-list';
import { HttpClient } from '@angular/common/http';
import { AngularFirestore, AngularFirestoreDocument, CollectionReference, AngularFirestoreCollection } from '@angular/fire/firestore';
import { firestore } from 'firebase';
import { map } from 'rxjs/operators';

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


    return  combineLatest([createdLists.valueChanges(), assignedLists.valueChanges()])
      .pipe(
        map(([createdResults, assignedResults]) => [...createdResults, ...assignedResults])
      );
  }

  updateList(id: string, list: IShoppingList) {
    const shoppingLists: AngularFirestoreCollection<IShoppingList> = this.fireStore.collection('lists');
    shoppingLists.doc(id).update(list);
  }

  createList(userId: string, list: any): Observable<void> {
    const documentId = this.fireStore.createId();
    const shoppingLists: AngularFirestoreCollection<IShoppingList> = this.fireStore.collection('lists');
    return from(shoppingLists.doc(documentId).set({
        ...list,
        users: [userId],
        date: firestore.Timestamp.now(),
        id: documentId
      }));
  }

  removeList(id: string) {
  }

}
