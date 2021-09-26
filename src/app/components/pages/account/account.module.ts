import {NgModule} from "@angular/core";
import {SharedModule} from "../../../shared/shared.module";
import {MaterialModule} from "../../../shared/material/material.module";
import {RouterModule} from "@angular/router";
import {AccountComponent} from "./account.component";


@NgModule({
  imports: [
    SharedModule,
    MaterialModule,
    RouterModule,
    RouterModule.forChild([{
      path: '',
      component: AccountComponent
    }])
  ],
  declarations: [
  ]
})

export class AccountModule {
}
