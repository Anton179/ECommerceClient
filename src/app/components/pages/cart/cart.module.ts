import {NgModule} from "@angular/core";
import {SharedModule} from "../../../shared/shared.module";
import {MaterialModule} from "../../../shared/material/material.module";
import {RouterModule} from "@angular/router";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {CartComponent} from "./cart.component";
import {ItemsModule} from "../../items/items.module";
import {DialogsModule} from "../../dialogs/dialogs.module";

@NgModule({
  imports: [
    DialogsModule,
    SharedModule,
    MaterialModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
    ItemsModule,
    RouterModule.forChild([{
      path: '',
      component: CartComponent
    }])
  ],
  declarations: [
    CartComponent,
  ]
})

export class CartModule {
}
