import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { auth } from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';

import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/firestore';

import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { IGoogleUser } from '../../../shared/models/user/google-user';
import {IUser} from '../../../shared/models/user/user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user$: Observable<IUser|null>;

  constructor(
    private angularFireAuth: AngularFireAuth,
    private angularFirestore: AngularFirestore,
    private router: Router
  ) {
    this.user$ = this.angularFireAuth.authState.pipe(
      switchMap((user: IGoogleUser) => {
        if (!user) {
          return of(null);
        }
        return this.angularFirestore.doc(`users/${user.uid}`).valueChanges();
      })
    );
  }

  async googleSignIn(): Promise<boolean> {
    const provider = new auth.GoogleAuthProvider();
    const credential = await this.angularFireAuth.signInWithPopup(provider);
    await this.updateUserData(credential.user);
    return this.router.navigate(['/shopping-lists']);
  }

  async signOut(): Promise<boolean> {
    await this.angularFireAuth.signOut();
    return this.router.navigate(['/']);
  }

  updateUserData({ uid, email, displayName, photoURL }: IGoogleUser): Promise<void> {
    const userRef: AngularFirestoreDocument<IGoogleUser> = this.angularFirestore.doc(`users/${uid}`);

    const data: IGoogleUser = {
      uid,
      email,
      displayName,
      photoURL
    };

    return userRef.set(data, { merge: true });
  }
}
