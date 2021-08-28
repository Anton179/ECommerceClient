import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from './cart/cart.component';
import { HomeComponent } from './home/home.component';
import { OrdersComponent } from './orders/orders.component';
import { ProductComponent } from './product/product.component';

const routes: Routes = [
    {
        path: 'orders',
        component: OrdersComponent,
        pathMatch: 'full' 
    },
    {
        path: 'cart',
        component: CartComponent,
        pathMatch: 'full'
    },
    {
        path: 'product',
        children:[
            {
                path: ':id',
                component:ProductComponent
            },
            {
                path: '',
                component: HomeComponent
            },
        ]
    },
    {
        path: 'home',
        component: HomeComponent,
        pathMatch: 'full'
    },
    { 
        path: '', 
        redirectTo: 'home'
    },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule {}
