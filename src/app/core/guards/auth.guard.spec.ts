import { TestBed } from '@angular/core/testing';

import { AuthGuard } from './auth.guard';
import { Router, ActivatedRouteSnapshot } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';
import { of } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';
import { IUser } from 'src/app/shared/models/user/user';

fdescribe('AuthGuard', () => {
  let guard: AuthGuard;
  let router: Router;
  const authService: any = {
    user$: of(null)
  };
  const routeStateMock: any = { snapshot: {}, url: '/cookies' };


  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      providers: [
        {
          provide: AuthService,
          useValue: authService
        }
      ]
    });
    guard = TestBed.inject(AuthGuard);
    router = TestBed.inject(Router);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('should return false and redirect to homepage if user$ is null', () => {
    authService.user$ = of(null);
    const routerSpy = spyOn(router, 'navigate');

    guard.canActivate(new ActivatedRouteSnapshot(), routeStateMock).subscribe((canActivate: boolean) => {
      expect(canActivate).toEqual(false);
      expect(routerSpy).toHaveBeenCalledTimes(1);
      expect(routerSpy).toHaveBeenCalledWith(['/']);
    });
  });

  it('should return true if user exists', () => {
    const user: IUser = {
      uid: '123',
      email: 'test@mail.com',
      displayName: 'testUser',
      photoURL: 'mockUrl'
    };

    authService.user$ = of(user);

    guard.canActivate(new ActivatedRouteSnapshot(), routeStateMock).subscribe((canActivate: boolean) => {
      expect(canActivate).toEqual(true);
    });
  });
});
