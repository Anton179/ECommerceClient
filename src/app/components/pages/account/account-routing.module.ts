import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {ProductEditorComponent} from "./product-editor/product-editor.component";
import {AccountComponent} from "./account.component";
import {AuthGuardService} from "../../../core/services/auth-guard.service";
import {CanDeactivateGuard} from "../../../core/services/canDeactivate-guard.service";
import {Roles} from "../../../constants/roles";

const routes: Routes = [
  {
    path: 'product',
    component:
    ProductEditorComponent,
    canActivate: [AuthGuardService],
    canDeactivate: [CanDeactivateGuard],
    data: {roles: [Roles.vendor]}
  },
  {path: '', pathMatch: 'full', component: AccountComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountRoutingModule {

}
