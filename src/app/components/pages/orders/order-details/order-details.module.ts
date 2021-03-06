import {RouterModule} from "@angular/router";
import {OrderDetailsComponent} from "./order-details.component";
import {MaterialModule} from "../../../../shared/material/material.module";
import {SharedModule} from "../../../../shared/shared.module";
import {NgModule} from "@angular/core";

@NgModule({
  imports: [
    SharedModule,
    MaterialModule,
    RouterModule,
    RouterModule.forChild([{
      path: '',
      component: OrderDetailsComponent
    }])
  ],
  declarations: [
    OrderDetailsComponent
  ]
})

export class OrderDetailsModule {
}
