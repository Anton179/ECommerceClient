import {Component, OnInit, ViewChild} from '@angular/core';
import {MatMenuTrigger} from '@angular/material/menu';
import {Router} from '@angular/router';
import {AuthService} from 'src/app/core/services/auth.service';
import {CartService} from 'src/app/core/services/cart.service';
import {CategoryService} from "../../../core/services/category.service";
import {Category} from "../../../core/models/category.model";
import {HttpParams} from "@angular/common/http";

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
  categories: Category[] = [{name: 'Shop by category'}]
  userAuthenticated = false;

  constructor(private _authService: AuthService, private _router: Router,
              private _cartService: CartService, private _categoryService: CategoryService) {
    this._authService.loginChanged
      .subscribe(userAuthenticated => {
        this.userAuthenticated = userAuthenticated;

        if (userAuthenticated) {
          this._authService.getUserName().then(userName => {
            this.userName = userName
          })

          this._authService.getRole().then(role => {
            this.userRole = role;

            if (role == 'user') {
              this._cartService.notifyObservable.subscribe((notifyState) => {
                if (this.userAuthenticated) {
                  this.updateShoppingCartBadge();
                }
              })
            }
          })
        }
      })
  }

  searchProducts() {
    let params = new HttpParams();

    if (this.productName != '') {
      params = params.set('product', this.productName)

      if (this.selectedCategory != 'All categories') {
        params = params.set('category', this.selectedCategory)
      }

      this._router.navigateByUrl(`/products?${params.toString()}`)
    }
  }

  cartOpen() {
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

        if (this.userAuthenticated && this.userRole == 'user') {
          this.updateShoppingCartBadge();
        } else {
          this.shoppingCartBadge = 0;
        }
      })

    this._categoryService.getCategories().subscribe((categories: Category[]) => {
      this.categories[0].subCategories = categories.filter(c => c.parent == null);

      categories.forEach((category: Category) => {
        this.filterCategories.push(category.name)
      });
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
