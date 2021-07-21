import { NgModule } from "@angular/core";
import { SharedModule } from "src/app/shared/shared.module";
import { HomeComponent } from './home/home.component';
import { MaterialModule } from "src/app/shared/material/material.module";
import { ComponentsModule } from "../components.module";


@NgModule({
    imports: [
        SharedModule,
        MaterialModule,
        ComponentsModule
    ],
    declarations: [
        HomeComponent,
    ]
})

export class PagesModule {};