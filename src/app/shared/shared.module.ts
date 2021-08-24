import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from './layout/header/header.component';
import { FooterComponent } from './layout/footer/footer.component';
import { MaterialModule } from './material/material.module';
import { RouterModule } from '@angular/router';
import { SigninRedirectCallbackComponent } from './AuthRedirect/signin-redirect-callback/signin-redirect-callback.component';
import { SignoutRedirectCallbackComponent } from './AuthRedirect/signout-redirect-callback/signout-redirect-callback.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        MaterialModule,
        RouterModule
    ],
    declarations: [
      HeaderComponent,
      FooterComponent,
      SignoutRedirectCallbackComponent,
      SigninRedirectCallbackComponent
  ],
    exports: [
      CommonModule,
      HeaderComponent,
      FooterComponent,
      SigninRedirectCallbackComponent,
      SignoutRedirectCallbackComponent,
    ]
})

export class SharedModule {}