import {Injectable} from "@angular/core";
import {AuthService} from "./auth.service";
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanLoad,
  Route,
  Router,
  RouterStateSnapshot,
  UrlSegment
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
    const canActivate = this.isAuthenticated().then(res => {
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
        }
        return true;
      }
      return false;
    });

    return canActivate;
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
    const canLoad = this.isAuthenticated().then(res => {
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

    return canLoad;
  }
}
