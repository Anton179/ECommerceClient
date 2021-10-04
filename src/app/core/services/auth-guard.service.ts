import {Injectable} from "@angular/core";
import {AuthService} from "./auth.service";
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanLoad,
  Route,
  Router,
} from "@angular/router";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate, CanLoad {
  private _userRole: string = '';

  constructor(private _authService: AuthService, private _router: Router) {
    this._authService.getRole().then(role => {
      this._userRole = role;
    })
  }

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> | boolean | Promise<boolean> {
    return this.isAuthenticated().then(res => {
      if (res) {
        switch (route.url.toString()) {
          case 'cart': {
            if (this._userRole != 'user') {
              this._router.navigateByUrl('/home')
              return false;
            }
            break;
          }
          case 'account': {
            if (this._userRole == 'operator') {
              this._router.navigateByUrl('/home')
              return false;
            }
            break;
          }
          case 'product': {
            if (this._userRole != 'vendor') {
              this._router.navigateByUrl('/home')
              return false;
            }
            break;
          }
        }
        return true;
      }
      return false;
    });
  }

  private isAuthenticated = () => {
    return this._authService.isAuthenticated()
      .then(userAuthenticated => {
        if (!userAuthenticated) {
          this._authService.login()
          return false
        } else {
          return true
        }
      });
  }

  canLoad(route: Route): Observable<boolean> | boolean | Promise<boolean> {
    return this.isAuthenticated().then(res => {
      if (res) {
        switch (route.path) {
          case 'cart': {
            if (this._userRole != 'user') {
              this._router.navigateByUrl('/home')
              return false;
            }
            break;
          }
          case 'account': {
            if (this._userRole == 'operator') {
              this._router.navigateByUrl('/home')
              return false;
            }
            break;
          }
        }
        return true;
      }
      return false;
    });
  }
}
