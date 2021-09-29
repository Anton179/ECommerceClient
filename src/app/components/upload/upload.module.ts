import {NgModule} from "@angular/core";
import {MaterialModule} from "../../shared/material/material.module";
import {UploadImageComponent} from "./upload-image/upload-image.component";
import {CommonModule} from "@angular/common";

@NgModule({
  imports: [
    MaterialModule,
    CommonModule
  ],
  declarations: [
    UploadImageComponent
  ],
  exports: [
    UploadImageComponent
  ]
})
export class UploadModule {
}
