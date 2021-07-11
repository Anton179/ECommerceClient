import { NgModule } from "@angular/core";
import { SharedModule } from "src/app/shared";
import { OrdersComponent } from "./orders/orders.component";
import { HomeComponent } from './home/home.component';


@NgModule({
    imports: [
        SharedModule
    ],
    declarations: [
        OrdersComponent,
        HomeComponent
    ]
})

export class PagesModule {};