import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {OrderDetailsComponent} from "./order-details/order-details.component";
import {OrdersComponent} from "./orders.component";
import {AuthGuardService} from "../../../core/services/auth-guard.service";

const routes: Routes = [
  {path: ':id', component: OrderDetailsComponent},
  {path: '', pathMatch: 'full', component: OrdersComponent, canActivate: [AuthGuardService]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrdersRoutingModule {

  constructor() {
  }
}
