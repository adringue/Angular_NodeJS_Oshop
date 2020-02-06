import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router
} from '@angular/router';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { AuthService } from '../services/auth.service';
@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | Observable<boolean> | Promise<boolean> {
    // throw new Error('Method not implemented.');
    // return true--> router we are protecting is accessible
    const isAuth = this.authService.getIsAuth();
    if (!isAuth) {
      this.router.navigate(['/login'], { queryParams: {returnUrl: state.url}});
    }
    return isAuth;
  }
}
// add the guard in the app.routing.module
