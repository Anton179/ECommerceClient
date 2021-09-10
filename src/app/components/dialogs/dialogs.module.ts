import {NgModule} from "@angular/core";
import {MaterialModule} from "../../shared/material/material.module";
import { PlaceOrderDialogComponent } from './place-order-dialog/place-order-dialog.component';
import {CommonModule} from "@angular/common";


@NgModule({
  imports: [
    MaterialModule,
    CommonModule
  ],
  declarations: [
    PlaceOrderDialogComponent
  ],
  exports: [
    PlaceOrderDialogComponent
  ]
})

export class DialogsModule {};
