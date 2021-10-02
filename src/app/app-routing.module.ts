import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuardService} from "./core/services/auth-guard.service";

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./components/pages/auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: 'orders',
    loadChildren: () => import('./components/pages/orders/orders.module').then(m => m.OrdersModule),
    canActivate: [AuthGuardService]
  },
  {
    path: 'products',
    loadChildren: () => import('./components/pages/products/products.module').then(m => m.ProductsModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./components/pages/home/home.module').then(m => m.HomeModule)
  },
  {
    path: 'cart',
    loadChildren: () => import('./components/pages/cart/cart.module').then(m => m.CartModule),
    canActivate: [AuthGuardService]
  },
  {
    path: 'account',
    loadChildren: () => import('./components/pages/account/account.module').then(m => m.AccountModule),
    canActivate: [AuthGuardService]
  },
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: '/home'
  }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
