import { Injectable } from '@angular/core';
import {
    AngularFirestore,
    AngularFirestoreCollection, AngularFirestoreDocument,
} from '@angular/fire/firestore';
import { filter, map, switchMap, take, tap } from 'rxjs/operators';
import { IUser } from '../../../shared/models/user/user';
import { Observable } from 'rxjs';
import { firestore } from 'firebase/app';

@Injectable({
    providedIn: 'root'
})
export class ContactsRepositoryService {

    constructor(private fireStore: AngularFirestore) {
    }

    getUsers(pattern): Observable<IUser[]> {
        const users: AngularFirestoreCollection<IUser> = this.fireStore.collection('users');
        return users
            .valueChanges()
            .pipe(
                map((allUsers: IUser[]) => allUsers.filter((user: IUser) => user.displayName.toLowerCase().includes(pattern.toLowerCase())))
            );
    }

    addContact(loggedInUserUid: string, addedContactUid: string): Promise<void> {
        const loggedInUser = this.fireStore.doc(`users/${loggedInUserUid}`);
        const addedUser = this.fireStore.doc(`users/${addedContactUid}`);

        return loggedInUser.update({
            contacts: firestore.FieldValue.arrayUnion(addedContactUid)
        })
            .then(() => {
                return addedUser.update({
                    contacts: firestore.FieldValue.arrayUnion(loggedInUserUid)
                });
            });
    }

    getUserContacts(userId: string): Observable<IUser[]> {
        const usersCollection: AngularFirestoreCollection<IUser> = this.fireStore.collection('users');
        const userDocument: AngularFirestoreDocument<IUser> = this.fireStore.doc(`users/${userId}`);

        return userDocument
            .valueChanges()
            .pipe(
                switchMap((loggedInUser: IUser) => {
                    return usersCollection
                        .valueChanges()
                        .pipe(
                            map((allusers: IUser[]) =>
                                allusers.filter(singleUser => loggedInUser.contacts && loggedInUser.contacts.includes(singleUser.uid))),
                        );
                })
            );
    }
}
