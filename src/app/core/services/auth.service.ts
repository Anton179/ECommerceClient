import { Injectable } from '@angular/core';
import { UserManager, User, UserManagerSettings } from 'oidc-client';
import { AuthContants } from '../../constants/authConstants';
import { Subject } from 'rxjs';
import { CartService } from './cart.service';
import jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _userManager: UserManager;
  private _user: User | null = null;
  private _loginChangedSubject = new Subject<boolean>();

  public loginChanged = this._loginChangedSubject.asObservable();

  constructor(private _cartService: CartService) {
    this._userManager = new UserManager(this.idpSettings);
  }

  getDecodedAccessToken(token: string): any {
    try{
      return jwt_decode(token);
    }
    catch(Error){
      return null;
    }
  }

  public getUserName = () => {
    return this._userManager.getUser().then(user => user);
  }

  public login = () => {
    return this._userManager.signinRedirect();
  }

  public getAccessToken = (): Promise<string | null> => {
    return this._userManager.getUser()
      .then(user => {
         return !!user && !user.expired ? user.access_token : null;
    });
  }

  public getRefreshToken = (): Promise<string | null> => {
    return this._userManager.getUser()
      .then(user => {
         return !!user && !!user.refresh_token ? user.refresh_token : null;
    });
  }

  public isAuthenticated = (): Promise<boolean> => {
    return this._userManager.getUser()
    .then(user => {
      if(this._user !== user){
        this._loginChangedSubject.next(this.checkUser(user));
      }

      this._user = user; // Check

      return this.checkUser(this._user);
    })
  }

  public finishLogin = (): Promise<User> => {
    return this._userManager.signinRedirectCallback()
    .then(user => {
      this._user = user;
      this._loginChangedSubject.next(this.checkUser(user));
      this._cartService.changeState('');
      return user;
    })
  }

  public logout = () => {
    this._userManager.signoutRedirect();
  }

  public finishLogout = () => {
    this._user = null;
    return this._userManager.signoutRedirectCallback();
  }

  private get idpSettings() : UserManagerSettings {
    return {
      authority: AuthContants.idpAuthority,
      client_id: AuthContants.clientId,
      client_secret: AuthContants.clientSecret,
      redirect_uri: `${AuthContants.clientRoot}/auth/signin-callback`,
      scope: "openid profile full offline_access",
      response_type: "code",
      post_logout_redirect_uri: `${AuthContants.clientRoot}/auth/signout-callback`,
    }
  }

  private checkUser = (user: User | null): boolean => {
    return !!user && !user.expired;
  }
}
