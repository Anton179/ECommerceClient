import { Component, OnInit } from '@angular/core';
import { Cart } from 'src/app/core/models/cart.model';
import { CartService } from 'src/app/core/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  constructor(private _cartService: CartService) { }

  cartList: Cart[] = [];

  ngOnInit(): void {
    this._cartService.getCart().subscribe((cart: Cart[]) => {
      this.cartList = cart;
    });
  }

  clearCart() {
    this._cartService.clearCart().subscribe(() => {
      this._cartService.changeState('Cart is empty');
    });
  }

}
