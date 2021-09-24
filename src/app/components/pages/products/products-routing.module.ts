import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {ProductsComponent} from "./products.component";
import {ProductDetailsComponent} from "./product-details/product-details.component";

const routes: Routes = [
  {path: ':id', component: ProductDetailsComponent},
  {path: '', pathMatch: 'full', component: ProductsComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule {

}
