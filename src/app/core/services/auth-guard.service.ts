import {Injectable} from "@angular/core";
import {AuthService} from "./auth.service";
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from "@angular/router";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate{
  private _canActivate: boolean | Promise<boolean> = false;
  constructor(private _authService: AuthService, private _router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state : RouterStateSnapshot): Observable<boolean> | boolean | Promise<boolean> {

    this._canActivate =  this.hasAccess().then(res => {
      return res;
    });

    return this._canActivate;
  }

  private hasAccess = () => {
    return  this._authService.isAuthenticated()
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
