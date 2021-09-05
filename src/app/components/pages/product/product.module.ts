import {NgModule} from "@angular/core";
import {SharedModule} from "../../../shared/shared.module";
import {MaterialModule} from "../../../shared/material/material.module";
import {RouterModule} from "@angular/router";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ProductComponent} from "./product.component";
import {ProductRoutingModule} from "./product-routing.module";
import {ItemsModule} from "../../items/items.module";

@NgModule({
  imports: [
    SharedModule,
    MaterialModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
    ItemsModule,
    ProductRoutingModule
  ],
  declarations: [
    ProductComponent,
  ]
})

export class ProductModule {
}
