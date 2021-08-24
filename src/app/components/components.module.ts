import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { MaterialModule } from "src/app/shared/material/material.module";
import { ProductItemComponent } from "./product-item/product-item.component";


@NgModule({
    imports: [
        MaterialModule,
        RouterModule
    ],
    declarations: [  
        ProductItemComponent
    ],
    exports:[
        ProductItemComponent
    ]

})

export class ComponentsModule {};