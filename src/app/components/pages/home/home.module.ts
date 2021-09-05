import {NgModule} from "@angular/core";
import {SharedModule} from "../../../shared/shared.module";
import {MaterialModule} from "../../../shared/material/material.module";
import {RouterModule} from "@angular/router";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HomeComponent} from "./home.component";
import {ItemsModule} from "../../items/items.module";

@NgModule({
  imports: [
    SharedModule,
    MaterialModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
    ItemsModule,
    RouterModule.forChild([{
      path: '',
      component: HomeComponent
    }])
  ],
  declarations: [
    HomeComponent,
  ]
})

export class HomeModule {
}
