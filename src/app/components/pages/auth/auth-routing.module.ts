import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SignoutRedirectCallbackComponent} from "./signout-redirect-callback/signout-redirect-callback.component";
import {SigninRedirectCallbackComponent} from "./signin-redirect-callback/signin-redirect-callback.component";

const routes: Routes = [
  {path: 'signin-callback', component: SigninRedirectCallbackComponent},
  {path: 'signout-callback', component: SignoutRedirectCallbackComponent},
  {path: '', pathMatch: 'full', redirectTo: '/home'}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule {
}
