import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {switchMap} from "rxjs/operators";
import {OrderService} from "../../../../core/services/order.service";
import {Order} from "../../../../core/models/order.model";
import {OrderStatus} from "../../../../core/enums/OrderStatus";
import {PaymentType} from "../../../../core/enums/PaymentType";
import {CartService} from "../../../../core/services/cart.service";

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.scss']
})
export class OrderDetailsComponent implements OnInit {

  constructor(private _activateRoute: ActivatedRoute, private _orderService: OrderService,
              private _cartService: CartService) { }

  order: Order | undefined;
  test: OrderStatus = OrderStatus.Confirmed;
  OrderStatus = OrderStatus;
  PaymentType = PaymentType;
  subTotalPrice: number = 0;

  ngOnInit() {
    this._activateRoute.paramMap.pipe(
      switchMap(params => params.getAll('id'))
    )
    .subscribe(data => {
      this._orderService.getOrder(data).subscribe((order: Order) => {
        this.order = order;
        this.subTotalPrice = 0;

        order.orderProducts?.forEach(p => {
          this.subTotalPrice += p.product?.price ?? 0;
        })
      });
    });
  }

  addToCart(id: string | undefined) {
    this._cartService.addCartItem({productId: id ?? '', quantity: 1})
  }

}
