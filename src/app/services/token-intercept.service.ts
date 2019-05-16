import {
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HTTP_INTERCEPTORS
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { from } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable()
export class TokenInterceptService implements HttpInterceptor {
  constructor(private auth: AuthService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler) {
    return from(this.auth.getIdToken()).pipe(
      switchMap(idToken => {
        if (!idToken) {
          return next.handle(request);
        }

        const nextRequest = request.clone({
          setHeaders: {
            Authorization: `Bearer ${idToken}`
          }
        });
        return next.handle(nextRequest);
      })
    );
  }
}

export const TokenInterceptor = {
  provide: HTTP_INTERCEPTORS,
  useClass: TokenInterceptService,
  multi: true
};
