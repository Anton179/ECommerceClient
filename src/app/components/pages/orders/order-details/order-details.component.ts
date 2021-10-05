import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {switchMap} from "rxjs/operators";
import {OrderService} from "../../../../core/services/order.service";
import {Order} from "../../../../core/models/order.model";
import {OrderStatus} from "../../../../core/enums/OrderStatus";
import {PaymentType} from "../../../../core/enums/PaymentType";
import {CartService} from "../../../../core/services/cart.service";
import {AuthService} from "../../../../core/services/auth.service";
import {Roles} from "../../../../constants/roles";

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.scss']
})
export class OrderDetailsComponent implements OnInit {

  order: Order | undefined;
  OrderStatus = OrderStatus;
  PaymentType = PaymentType;
  subTotalPrice: number = 0;
  userRole: string = '';
  Roles = Roles;

  constructor(private _activateRoute: ActivatedRoute, private _orderService: OrderService,
              private _cartService: CartService, private _authService: AuthService) {
  }

  ngOnInit(): void {
    this._activateRoute.paramMap.pipe(
      switchMap(params => params.getAll('id'))
    )
      .subscribe(data => {
        this._orderService.getOrder(data).subscribe((order: Order) => {
          this.order = order;
          this.subTotalPrice = 0;

          order.orderProducts?.forEach(p => {
            this.subTotalPrice += (p.product?.price ?? 0) * (p.quantity ?? 0);
          })
        });
      });

    this._authService.getRole().then(role => {
      this.userRole = role;
    })
  }

  addToCart(id: string | undefined): void {
    this._cartService.addCartItem({productId: id ?? '', quantity: 1})
  }

}
