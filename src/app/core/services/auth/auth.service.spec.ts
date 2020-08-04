import { TestBed } from '@angular/core/testing';

import { AuthService } from './auth.service';
import { RouterTestingModule } from '@angular/router/testing';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { of } from 'rxjs';

import 'firebase/auth';
import { IUser } from 'src/app/shared/models/user/user';

describe('AuthService', () => {
  let service: AuthService;
  let router: Router;
  const fireStoreMock: any = {
    doc() {}
  };
  const fireAuthMock: any = {
    get authState() {
      return of(null);
    },
    signInWithPopup() { },
    signOut() {}
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      providers: [
        {
          provide: AngularFireAuth,
          useValue: fireAuthMock
        },
        {
          provide: AngularFirestore,
          useValue: fireStoreMock
        }
      ]
    });
    service = TestBed.inject(AuthService);
    router = TestBed.inject(Router);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should login user sucessfully', async () => {
    const user: IUser = {
      uid: '1234',
      email: 'test@mail.co',
      displayName: 'testUser',
      photoURL: 'testPhotoUrl'
    }
    const setSpy = jasmine.createSpy();
    const routerSpy = spyOn(router, 'navigate');
    const docSpy = spyOn(fireStoreMock, 'doc').and.returnValue({
      set: setSpy
    });
    spyOn(fireAuthMock, 'signInWithPopup').and.resolveTo({user});

    await service.googleSignIn();

    expect(routerSpy).toHaveBeenCalledWith(['/shopping-lists']);
    expect(setSpy).toHaveBeenCalledWith(user, {merge: true});
    expect(docSpy).toHaveBeenCalledWith('users/1234');
  });

  it('should logout user', async () => {
    const routerSpy = spyOn(router, 'navigate');
    const signOutSpy = spyOn(fireAuthMock, 'signOut');

    await service.signOut();

    expect(routerSpy).toHaveBeenCalledWith(['/']);
    expect(signOutSpy).toHaveBeenCalledTimes(1);
  });
});
