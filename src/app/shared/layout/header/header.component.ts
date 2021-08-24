import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatMenuTrigger } from '@angular/material/menu';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-layout-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @ViewChild('loginMenuTrigger') loginMenuTrigger: MatMenuTrigger | undefined;

  shoppingCartBadge: number = 3;
  hiddenCartBadge: boolean = !this.shoppingCartBadge;
  
  public userAuthenticated = false;

  constructor(private _authService: AuthService, private _router: Router){
    this._authService.loginChanged
      .subscribe(userAuthenticated => {
        this.userAuthenticated = userAuthenticated;
      })
  }

  async ngOnInit(): Promise<void> {
    this._authService.isAuthenticated()
      .then(userAuthenticated => {
        this.userAuthenticated = userAuthenticated;
      })
  }

  public menuTrigger() {
    if (this.userAuthenticated) {
      this.loginMenuTrigger?.openMenu();
    }
  }

  public login = (event: MouseEvent) => {
    event.stopPropagation();
    event.preventDefault();
    if (!this.userAuthenticated) {
      this._authService.login();
    }
  }

  public logout = () => {
    this._authService.logout();
  }
}
