import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Injectable()  // to be able to inject other services

export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) { }
  // angular will call this method for request leaving your app, only for
  // outgoing requests
  // next allow us us to leave the intercept and continue
  // Authorization here because we do headers.authorization in the backend
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const authToken = this.authService.getToken();
    const authRequest = req.clone({
      headers: req.headers.set('Authorization', 'Bearer ' + authToken)
    });
    return next.handle(authRequest); // now this new authrequest will leave
    // our app
  }
}
// we will need toregister this interceptor in app.module.ts
// and add Authorization header in backend/app.js
