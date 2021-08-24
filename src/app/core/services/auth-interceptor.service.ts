import { HttpErrorResponse, HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { from, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthContants } from 'src/app/constants/authConstants';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor {
  constructor(private _authService: AuthService, private _router: Router) { }
  
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if(req.url.startsWith(AuthContants.apiRoot)){
      return from(
        this._authService.getAccessToken()
        .then(token => {
          const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
          const authRequest = req.clone({ headers });
          return next.handle(authRequest)
          .pipe(
            catchError((err: HttpErrorResponse) => {
              if (err && err.status === 401)
              {
                this._authService.login();
              }
              else if (err && err.status === 403) {
                this._router.navigate(['/home']);
              }

              throw 'error in a request ' + err.status;
            })
          )
          .toPromise();
        })
      );
    }
    else {
      return next.handle(req);
    }
  }
}