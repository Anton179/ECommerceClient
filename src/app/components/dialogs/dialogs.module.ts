import {NgModule} from "@angular/core";
import {MaterialModule} from "../../shared/material/material.module";
import { PlaceOrderDialogComponent } from './place-order-dialog/place-order-dialog.component';


@NgModule({
  imports: [
    MaterialModule,
  ],
  declarations: [
    PlaceOrderDialogComponent
  ],
  exports: [
    PlaceOrderDialogComponent
  ]
})

export class DialogsModule {};
