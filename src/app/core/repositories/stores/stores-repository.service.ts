import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { IStore } from 'src/app/shared/models/stores/store';

@Injectable({
  providedIn: 'root'
})
export class StoresRepositoryService {

  constructor(private fireStore: AngularFirestore) {}

  getStores(): Observable<IStore[]> {
    const list: AngularFirestoreCollection<IStore> = this.fireStore.collection(`stores`);
    return list.valueChanges();
  }
}
