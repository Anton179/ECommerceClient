import {Component, DoCheck, OnInit} from '@angular/core';
import {Cart} from 'src/app/core/models/cart.model';
import {CartService} from 'src/app/core/services/cart.service';
import {AuthService} from "../../../core/services/auth.service";
import {MatDialog} from "@angular/material/dialog";
import {PlaceOrderDialogComponent} from "../../dialogs/place-order-dialog/place-order-dialog.component";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit, DoCheck {

  delivery = [{name: 'Nova Poshta', price: 25}, {name: 'DHL Express', price: 40}];
  chosenDelivery = this.delivery[0].name;
  subTotalPrice: number = 0;
  totalPrice: number = 0;
  cartList: Cart[] = [];

  constructor(private _cartService: CartService, private _authService: AuthService, public dialog: MatDialog) {
    this._cartService.notifyObservable.subscribe((notifyState) => {
      this.updateCartList();
    })
  }

  ngDoCheck() {
    this.totalPrice = this.subTotalPrice + (this.delivery.find(x => x.name == this.chosenDelivery)?.price ?? 0);
  }

  ngOnInit(): void {
    this._cartService.getCart().subscribe((cart: Cart[]) => {
      this.updateCartList()
    });
  }

  updateCartList() {
    this._cartService.getCart().subscribe((cart: Cart[]) => {
      this.cartList = cart;
      this.subTotalPrice = 0;

      cart.forEach(elem => {
        this.subTotalPrice += (elem?.product?.price ?? 0) * elem.quantity;
      });
    });
  }

  placeOrder(price: number) {
    const dialogRef = this.dialog.open(PlaceOrderDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  removeProduct(id: string | undefined) {
    this._cartService.removeCart(id ?? "").subscribe(() => {
      this._cartService.changeState('Product was removed');
    });
  }

  clearCart() {
    this._cartService.clearCart().subscribe(() => {
      this._cartService.changeState('Cart is empty');
    });
  }

}
