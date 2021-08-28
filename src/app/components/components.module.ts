import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { MaterialModule } from "src/app/shared/material/material.module";
import { ProductItemComponent } from "./product-item/product-item.component";
import { CartItemComponent } from './cart-item/cart-item.component';


@NgModule({
    imports: [
        MaterialModule,
        RouterModule
    ],
    declarations: [  
        ProductItemComponent, 
        CartItemComponent
    ],
    exports:[
        ProductItemComponent,
        CartItemComponent
    ]

})

export class ComponentsModule {};