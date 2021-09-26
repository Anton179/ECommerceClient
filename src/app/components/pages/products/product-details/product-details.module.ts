import {NgModule} from "@angular/core";
import {SharedModule} from "../../../../shared/shared.module";
import {MaterialModule} from "../../../../shared/material/material.module";
import {RouterModule} from "@angular/router";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ProductDetailsComponent} from "./product-details.component";
import {ItemsModule} from "../../../items/items.module";

@NgModule({
  imports: [
    SharedModule,
    MaterialModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
    ItemsModule,
    RouterModule.forChild([{
      path: '',
      component: ProductDetailsComponent
    }])
  ],
  declarations: [
    ProductDetailsComponent,
  ]
})

export class ProductDetailsModule {
}
