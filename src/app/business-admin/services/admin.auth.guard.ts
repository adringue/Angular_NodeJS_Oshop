import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router
} from '@angular/router';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { AuthService } from '../../user-auth/services/auth.service';
@Injectable()
export class AdminAuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | Observable<boolean> | Promise<boolean> {
    if (!this.isAdmin()) {
      this.router.navigate(['/access-error'], { queryParams: { returnUrl: state.url } });
    }
    return this.isAdmin();
  }
  isAdmin() {
    if (this.authService.decodedTokenGetter()) {
      if (this.authService.decodedTokenGetter().email === 'nguesseu@yahoo.com') {
        return true;
      }
    }
  }
}
