import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HeaderComponent} from './layout/header/header.component';
import {FooterComponent} from './layout/footer/footer.component';
import {MaterialModule} from './material/material.module';
import {RouterModule} from '@angular/router';
import {MenuItemComponent} from "./layout/header/menu-item/menu-item.component";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MaterialModule,
    RouterModule
  ],
  declarations: [
    HeaderComponent,
    FooterComponent,
    MenuItemComponent
  ],
  exports: [
    CommonModule,
    HeaderComponent,
    FooterComponent,
    MenuItemComponent
  ]
})

export class SharedModule {
}
