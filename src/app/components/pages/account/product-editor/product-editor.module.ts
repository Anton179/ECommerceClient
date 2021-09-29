import {NgModule} from "@angular/core";
import {SharedModule} from "../../../../shared/shared.module";
import {MaterialModule} from "../../../../shared/material/material.module";
import {RouterModule} from "@angular/router";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ProductEditorComponent} from "./product-editor.component";
import {UploadModule} from "../../../upload/upload.module";

@NgModule({
  imports: [
    SharedModule,
    MaterialModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
    UploadModule,
  ],
  declarations: [
    ProductEditorComponent
  ]
})
export class ProductEditorModule {
}
