import { NgModule } from "@angular/core";
import { SharedModule } from "src/app/shared/shared.module";
import { HomeComponent } from './home/home.component';
import { MaterialModule } from "src/app/shared/material/material.module";
import { ComponentsModule } from "../components.module";
import { OrdersComponent } from "./orders/orders.component";
import { RouterModule } from "@angular/router";
import { ProductComponent } from './product/product.component';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CartComponent } from './cart/cart.component';


@NgModule({
    imports: [
        SharedModule,
        MaterialModule,
        ComponentsModule,
        RouterModule,
        ReactiveFormsModule,
        FormsModule
    ],
    declarations: [
        HomeComponent,
        OrdersComponent,
        ProductComponent,
        CartComponent,
    ]
})

export class PagesModule {};