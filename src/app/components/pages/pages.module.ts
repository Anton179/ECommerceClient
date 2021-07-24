import { NgModule } from "@angular/core";
import { SharedModule } from "src/app/shared/shared.module";
import { HomeComponent } from './home/home.component';
import { MaterialModule } from "src/app/shared/material/material.module";
import { ComponentsModule } from "../components.module";
import { OrdersComponent } from "./orders/orders.component";
import { RouterModule } from "@angular/router";
import { ProductComponent } from './product/product.component';


@NgModule({
    imports: [
        SharedModule,
        MaterialModule,
        ComponentsModule,
        RouterModule
    ],
    declarations: [
        HomeComponent,
        OrdersComponent,
        ProductComponent
    ]
})

export class PagesModule {};