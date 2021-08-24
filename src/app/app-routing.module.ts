import { NgModule } from '@angular/core';
import { RouterModule, Routes, PreloadAllModules } from '@angular/router';
import { SigninRedirectCallbackComponent } from './shared/AuthRedirect/signin-redirect-callback/signin-redirect-callback.component';
import { SignoutRedirectCallbackComponent } from './shared/AuthRedirect/signout-redirect-callback/signout-redirect-callback.component';

const routes: Routes = [
  { path: 'signin-callback', component: SigninRedirectCallbackComponent},
  { path: 'signout-callback', component: SignoutRedirectCallbackComponent },
  {
    path: '',
    loadChildren:() => import('./components/pages/pages-routing.module').then(m => m.PagesRoutingModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    // preload all modules; optionally we could
    // implement a custom preloading strategy for just some
    // of the modules
    preloadingStrategy: PreloadAllModules,
    //relativeLinkResolution: 'legacy'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
