import {Component, Input, OnInit} from '@angular/core';
import {Product} from 'src/app/core/models/product.model';
import {CartService} from "../../../core/services/cart.service";
import {AuthService} from "../../../core/services/auth.service";
import {Roles} from "../../../constants/roles";

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss']
})
export class ProductItemComponent implements OnInit {
  @Input() productItem?: Product;
  userRole?: Roles;
  Roles = Roles;

  constructor(private _cartService: CartService, private _authService: AuthService) {
  }

  ngOnInit(): void {
    this._authService.getRole().then((role: Roles) => {
      this.userRole = role;
    })
  }

  addToCart(productId: string): void {
    this._authService.isAuthenticated().then(authenticated => {
      if (authenticated) {
        this._cartService.addCartItem({productId: productId, quantity: 1});
      } else {
        this._authService.login();
      }
    })
  }
}
