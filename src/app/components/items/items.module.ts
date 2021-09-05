import {NgModule} from "@angular/core";
import {MaterialModule} from "../../shared/material/material.module";
import {RouterModule} from "@angular/router";
import {ProductItemComponent} from "./product-item/product-item.component";
import {CartItemComponent} from "./cart-item/cart-item.component";

@NgModule({
  imports: [
    MaterialModule,
    RouterModule
  ],
  declarations: [
    ProductItemComponent,
    CartItemComponent
  ],
  exports:[
    ProductItemComponent,
    CartItemComponent
  ]

})

export class ItemsModule {};
