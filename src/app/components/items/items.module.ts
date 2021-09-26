import {NgModule} from "@angular/core";
import {MaterialModule} from "../../shared/material/material.module";
import {RouterModule} from "@angular/router";
import {ProductItemComponent} from "./product-item/product-item.component";
import {CommonModule} from "@angular/common";

@NgModule({
    imports: [
        MaterialModule,
        RouterModule,
        CommonModule
    ],
  declarations: [
    ProductItemComponent,
  ],
  exports:[
    ProductItemComponent,
  ]

})

export class ItemsModule {};
