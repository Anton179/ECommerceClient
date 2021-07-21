import { NgModule } from "@angular/core";
import { MaterialModule } from "src/app/shared/material/material.module";
// import { PagesModule } from "./pages/pages.module";
import { ProductItemComponent } from "./product-item/product-item.component";

@NgModule({
    imports: [
        MaterialModule,
        // PagesModule
    ],
    declarations: [  
        ProductItemComponent
    ],
    exports:[
        ProductItemComponent
    ]

})

export class ComponentsModule {};