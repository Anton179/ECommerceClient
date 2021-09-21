import {Component, DoCheck, OnInit} from '@angular/core';
import {CartItem} from 'src/app/core/models/cartItem.model';
import {CartService} from 'src/app/core/services/cart.service';
import {AuthService} from "../../../core/services/auth.service";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {PlaceOrderDialogComponent} from "../../dialogs/place-order-dialog/place-order-dialog.component";
import {ShippingService} from "../../../core/services/shipping.service";
import {ShippingMethod} from "../../../core/models/shippingMethod.model";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit, DoCheck {

  shippingList: ShippingMethod[] = [];
  delivery = [{name: 'Nova Poshta', price: 25}, {name: 'DHL Express', price: 40}];
  choosenShipping: ShippingMethod | undefined;
  shippingName = ''
  shippingPrice: number = this.delivery[0].price;
  subTotalPrice: number = 0;
  totalPrice: number = 0;
  cartList: CartItem[] = [];

  constructor(private _cartService: CartService, private _shippingService: ShippingService,
              private _authService: AuthService, public dialog: MatDialog) {
    this._cartService.notifyObservable.subscribe((notifyState) => {
      this.updateCartList();
    })
  }

  ngDoCheck() {
    this.totalPrice = this.subTotalPrice + (this.choosenShipping?.price ?? 0);
  }

  ngOnInit(): void {
    this._cartService.getCart().subscribe((cart: CartItem[]) => {
      this.updateCartList()
    });

    this._shippingService.getShippings().subscribe((shipping: ShippingMethod[]) => {
      this.shippingList = shipping;
      this.choosenShipping = this.shippingList[0];
      this.shippingName = this.choosenShipping.name ?? '';
    })
  }

  updateCartList() {
    this._cartService.getCart().subscribe((cart: CartItem[]) => {
      this.cartList = cart;
      this.subTotalPrice = 0;

      cart.forEach(elem => {
        this.subTotalPrice += (elem?.product?.price ?? 0) * elem.quantity;
      });
    });
  }

  updateShipping() {
    this.choosenShipping = this.shippingList.find(x => x.name == this.shippingName);
    this.shippingPrice = this.choosenShipping?.price ?? 0;
  }

  placeOrder(price: number) {
    const matDialogConfig = new MatDialogConfig();
    matDialogConfig.data = {
      shipping: this.choosenShipping,
      cartItems: this.cartList
    };
    matDialogConfig.disableClose = true;

    const dialogRef = this.dialog.open(PlaceOrderDialogComponent, matDialogConfig);

    dialogRef.afterClosed().subscribe();
  }

  removeProduct(id: string | undefined) {
    this._cartService.removeCartItem(id ?? "").subscribe(() => {
      this._cartService.changeState('Product was removed');
    });
  }

  clearCart() {
    this._cartService.clearCart().subscribe(() => {
      this._cartService.changeState('Cart is empty');
    });
  }

}
