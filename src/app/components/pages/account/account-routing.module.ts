import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {ProductEditorComponent} from "./product-editor/product-editor.component";
import {AccountComponent} from "./account.component";
import {AuthGuardService} from "../../../core/services/auth-guard.service";

const routes: Routes = [
  {path: 'product', component: ProductEditorComponent, canActivate: [AuthGuardService]},
  {path: '', pathMatch: 'full', component: AccountComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountRoutingModule {

}
