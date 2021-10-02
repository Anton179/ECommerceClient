import {NgModule} from "@angular/core";
import {MaterialModule} from "../../shared/material/material.module";
import {PlaceOrderDialogComponent} from './place-order-dialog/place-order-dialog.component';
import {CommonModule} from "@angular/common";
import {CancelOrderDialogComponent} from './cancel-order-dialog/cancel-order-dialog.component';
import {ConfirmOrderDialogComponent} from './confirm-order-dialog/confirm-order-dialog.component';


@NgModule({
  imports: [
    MaterialModule,
    CommonModule
  ],
  declarations: [
    PlaceOrderDialogComponent,
    CancelOrderDialogComponent,
    ConfirmOrderDialogComponent
  ],
  exports: [
    PlaceOrderDialogComponent,
    CancelOrderDialogComponent
  ]
})

export class DialogsModule {
}
