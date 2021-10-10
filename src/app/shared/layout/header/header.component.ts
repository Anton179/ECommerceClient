import {Component, OnInit, ViewChild} from '@angular/core';
import {MatMenuTrigger} from '@angular/material/menu';
import {Router} from '@angular/router';
import {AuthService} from 'src/app/core/services/auth.service';
import {CartService} from 'src/app/core/services/cart.service';
import {CategoryService} from "../../../core/services/category.service";
import {Category} from "../../../core/models/category.model";
import {HttpParams} from "@angular/common/http";
import {Roles} from "../../../constants/roles";

@Component({
  selector: 'app-layout-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @ViewChild('loginMenuTrigger') loginMenuTrigger: MatMenuTrigger | undefined;
  userName: string = '';
  userRole: string = '';
  productName: string = '';
  shoppingCartBadge: number = 0;
  hiddenCartBadge: boolean = true;
  filterCategories: string[] = ['All categories'];
  selectedCategory: string = 'All categories';
  categories: Category[] = [{name: 'Shop by category'}];
  userAuthenticated = false;
  Roles = Roles;

  constructor(private _authService: AuthService, private _router: Router,
              private _cartService: CartService, private _categoryService: CategoryService) {
    this._authService.loginChanged
      .subscribe(userAuthenticated => {
        this.userAuthenticated = userAuthenticated;

        if (userAuthenticated) {
          this._authService.getUserName().then(userName => {
            this.userName = userName;
          })

          this._authService.getRole().then(role => {
            this.userRole = role;

            if (role == Roles.user) {
              this._cartService.notifyObservable.subscribe(() => {
                if (this.userAuthenticated) {
                  this.updateShoppingCartBadge();
                }
              })
            }
          })
        }
      })
  }

  searchProducts(): void {
    let params = new HttpParams();

    if (this.productName != '') {
      params = params.set('product', this.productName);

      if (this.selectedCategory != 'All categories') {
        params = params.set('category', this.selectedCategory);
      }

      this._router.navigateByUrl(`/products?${params.toString()}`);
    }
  }

  cartOpen(): void {
    if (this.userAuthenticated) {
      this._router.navigateByUrl('/cart');
    } else {
      this._authService.login();
    }
  }

  async ngOnInit(): Promise<void> {
    this._authService.isAuthenticated()
      .then(userAuthenticated => {
        this.userAuthenticated = userAuthenticated;

        if (this.userAuthenticated && this.userRole == Roles.user) {
          this.updateShoppingCartBadge();
        } else {
          this.shoppingCartBadge = 0;
        }
      })

    this._categoryService.getCategories().subscribe((categories: Category[]) => {
      this.categories[0].subCategories = categories.filter(c => c.parent == null);

      categories.forEach((category: Category) => {
        this.filterCategories.push(category.name);
      });
    })
  }

  updateShoppingCartBadge(): void {
    this._cartService.getNumberOfProducts().subscribe((count: number) => {
      this.shoppingCartBadge = count;
      this.hiddenCartBadge = !this.shoppingCartBadge;
    })
  }

  menuTrigger(): void {
    if (this.userAuthenticated) {
      this.loginMenuTrigger?.openMenu();
    }
  }

  login = (): void => {
    if (!this.userAuthenticated) {
      this._authService.login();
    }
  }

  logout = (): void => {
    this._authService.logout();
  }
}
