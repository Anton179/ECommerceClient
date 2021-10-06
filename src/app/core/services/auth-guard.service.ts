import {Injectable} from "@angular/core";
import {AuthService} from "./auth.service";
import {ActivatedRouteSnapshot, CanActivate, CanLoad, Route,} from "@angular/router";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate, CanLoad {
  private _userRole: string = '';

  constructor(private _authService: AuthService) {
    this._authService.getRole().then(role => {
      this._userRole = role;
    })
  }

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> | boolean | Promise<boolean> {
    return this.isAuthenticated().then(res => {
      if (res) {
        const roles = route.data.roles as string[]

        if (roles && roles.length > 0) {
          return roles.includes(this._userRole)
        }

        return true;
      }
      return false;
    });
  }

  canLoad(route: Route): Observable<boolean> | boolean | Promise<boolean> {
    return this.isAuthenticated().then(res => {
      if (res) {
        const roles = route.data?.roles as string[]

        if (roles && roles.length > 0) {
          return roles.includes(this._userRole)
        }

        return true;
      }
      return false;
    });
  }

  private isAuthenticated = (): Promise<false | true> => {
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
}
