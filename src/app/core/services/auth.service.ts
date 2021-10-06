import {Injectable} from '@angular/core';
import {SignoutResponse, User, UserManager, UserManagerSettings} from 'oidc-client';
import {AuthContants} from '../../constants/authConstants';
import {Subject} from 'rxjs';
import {CartService} from './cart.service';
import jwt_decode from 'jwt-decode';
import {UserClaims} from "../models/userClaims.model";

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

  private get idpSettings(): UserManagerSettings {
    return {
      authority: AuthContants.idpAuthority,
      client_id: AuthContants.clientId,
      client_secret: AuthContants.clientSecret,
      redirect_uri: `${AuthContants.clientRoot}/auth/signin-callback`,
      scope: "roles openid profile offline_access",
      response_type: "code",
      post_logout_redirect_uri: `${AuthContants.clientRoot}/auth/signout-callback`,
    }
  }

  public getUserName = (): Promise<string> => {
    return this.getAccessToken().then(token => {
      return this.getDecodedAccessToken(token ?? '')?.userName ?? ''
    })
  }

  public getRole = (): Promise<string> => {
    return this.getAccessToken().then(token => {
      return this.getDecodedAccessToken(token ?? '')?.role ?? ''
    })
  }

  public getUserId = (): Promise<string> => {
    return this.getAccessToken().then(token => {
      return this.getDecodedAccessToken(token ?? '')?.sub ?? ''
    })
  }

  public login = (): Promise<void> => {
    return this._userManager.signinRedirect();
  }

  public getAccessToken = (): Promise<string | null> => {
    return this._userManager.getUser()
      .then(user => {
        return !!user && !user.expired ? user.access_token : null;
      });
  }

  public isAuthenticated = (): Promise<boolean> => {
    return this._userManager.getUser()
      .then(user => {
        if (this._user !== user) {
          this._loginChangedSubject.next(this.checkUser(user));
        }

        this._user = user;

        return this.checkUser(this._user);
      })
  }

  public finishLogin = (): Promise<User> => {
    return this._userManager.signinRedirectCallback()
      .then(user => {
        this._user = user;
        this._loginChangedSubject.next(this.checkUser(user));
        this._cartService.changeState('');
        this.getDecodedAccessToken(user.access_token);
        return user;
      })
  }

  public logout = (): void => {
    this._userManager.signoutRedirect();
  }

  public finishLogout = (): Promise<SignoutResponse> => {
    this._user = null;
    return this._userManager.signoutRedirectCallback();
  }

  private getDecodedAccessToken(token: string): UserClaims | null {
    try {
      const userClaims = jwt_decode<UserClaims>(token);

      return userClaims;
    } catch (Error) {
      return null;
    }
  }

  private checkUser = (user: User | null): boolean => {
    return !!user && !user.expired;
  }
}
