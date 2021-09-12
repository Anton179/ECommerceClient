import {NgModule} from "@angular/core";
import {SharedModule} from "../../../shared/shared.module";
import {MaterialModule} from "../../../shared/material/material.module";
import {RouterModule} from "@angular/router";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {OrdersComponent} from "./orders.component";
import {OrdersRoutingModule} from "./orders-routing.module";
import {OrderDetailsModule} from "./order-details/order-details.module";

@NgModule({
  imports: [
    SharedModule,
    MaterialModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
    OrdersRoutingModule,
    OrderDetailsModule
  ],
  declarations: [
    OrdersComponent
  ]
})

export class OrdersModule {
}
