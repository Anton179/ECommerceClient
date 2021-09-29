import {NgModule} from "@angular/core";
import {SharedModule} from "../../../shared/shared.module";
import {MaterialModule} from "../../../shared/material/material.module";
import {RouterModule} from "@angular/router";
import {ItemsModule} from "../../items/items.module";
import {AccountRoutingModule} from "./account-routing.module";
import {AccountComponent} from "./account.component";
import {UploadModule} from "../../upload/upload.module";
import {ProductEditorModule} from "./product-editor/product-editor.module";


@NgModule({
  imports: [
    SharedModule,
    MaterialModule,
    RouterModule,
    ItemsModule,
    AccountRoutingModule,
    UploadModule,
    ProductEditorModule
  ],
  declarations: [
    AccountComponent,
  ],
  exports: [
    UploadModule
  ]
})

export class AccountModule {
}
