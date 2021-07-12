import { NgModule } from "@angular/core";
import { SharedModule } from "src/app/shared";
import { OrdersComponent } from "./orders/orders.component";
import { HomeComponent } from './home/home.component';
import { MaterialModule } from "../shared/material/material.module";

@NgModule({
    imports: [
        SharedModule,
        MaterialModule
    ],
    declarations: [
        OrdersComponent,
        HomeComponent,
    ]
})

export class PagesModule {};