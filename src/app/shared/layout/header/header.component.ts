import { Component, OnInit, ViewChild } from '@angular/core';
import { MatMenuTrigger } from '@angular/material/menu';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { CartService } from 'src/app/core/services/cart.service';

@Component({
  selector: 'app-layout-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @ViewChild('loginMenuTrigger') loginMenuTrigger: MatMenuTrigger | undefined;
  userName: string = "";
  shoppingCartBadge: number = 0;
  hiddenCartBadge: boolean = true;


  public userAuthenticated = false;

  constructor(private _authService: AuthService, private _router: Router, private _cartService: CartService) {
    this._authService.loginChanged
      .subscribe(userAuthenticated => {
        this.userAuthenticated = userAuthenticated;

        if (userAuthenticated)
        {
          this._authService.getAccessToken().then(accessToken => {
              this.userName = this._authService.getDecodedAccessToken(accessToken ?? "").userName
            }
          )
        }
      })
      this._cartService.notifyObservable.subscribe((notifyState) => {
        if (this.userAuthenticated)
        {
          this.updateShoppingCartBadge();
        }
      })
  }

  cartOpen() {
    if (this.userAuthenticated)
    {
      this._router.navigateByUrl('/cart');
    }
    else
    {
      this._authService.login();
    }
  }

  async ngOnInit(): Promise<void> {
    this._authService.isAuthenticated()
      .then(userAuthenticated => {
        this.userAuthenticated = userAuthenticated;

        if (this.userAuthenticated) {
          this.updateShoppingCartBadge();
        }
        else {
          this.shoppingCartBadge = 0;
        }
      })
  }

  public updateShoppingCartBadge() {
    this._cartService.getNumberOfProducts().subscribe((count: number) => {
      this.shoppingCartBadge = count;
      this.hiddenCartBadge = !this.shoppingCartBadge;
    })
  }

  public menuTrigger() {
    if (this.userAuthenticated) {
      this.loginMenuTrigger?.openMenu();
    }
  }

  public login = () => {
    if (!this.userAuthenticated) {
      this._authService.login();
    }
  }

  public logout = () => {
    this._authService.logout();
  }
}
