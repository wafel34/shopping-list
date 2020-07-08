import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth/auth.service';
import { take, map, tap } from 'rxjs/operators';
import { IUser } from 'src/app/shared/models/user/user';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {

  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    return this.authService.user$.pipe(
      take(1),
      map((user: IUser): boolean => !!user),
      tap((loggedIn: boolean) => {
        if (!loggedIn) {
          console.log('not logged in');
          this.router.navigate(['/']);
        }
      })
    );
  }

}
