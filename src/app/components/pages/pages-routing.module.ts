import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { OrdersComponent } from './orders/orders.component';
import { ProductComponent } from './product/product.component';

const routes: Routes = [
    {
        path: 'orders',
        component: OrdersComponent
    },
    {
        path: 'product/:id',
        component: ProductComponent
    },
    {
        path: '',
        component: HomeComponent
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule {}
