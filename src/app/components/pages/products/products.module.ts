import {NgModule} from "@angular/core";
import {SharedModule} from "../../../shared/shared.module";
import {MaterialModule} from "../../../shared/material/material.module";
import {RouterModule} from "@angular/router";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ItemsModule} from "../../items/items.module";
import {ProductsComponent} from "./products.component";
import {ProductDetailsModule} from "./product-details/product-details.module";
import {ProductsRoutingModule} from "./products-routing.module";

@NgModule({
  imports: [
    SharedModule,
    MaterialModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
    ItemsModule,
    ProductsRoutingModule,
    ProductDetailsModule,
  ],
  declarations: [
    ProductsComponent
  ]
})

export class ProductsModule {
}
