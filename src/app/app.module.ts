import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MaterialModule } from './shared/material/material.module';
import { SharedModule } from './shared/shared.module';
import { PagesModule } from './components/pages/pages.module';
import { ComponentsModule } from './components/components.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CoreModule } from './core/core.module';
import { AuthInterceptorService } from './core/services/auth-interceptor.service';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserAnimationsModule,
    MaterialModule,
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    PagesModule,
    ComponentsModule,
    HttpClientModule,
    MaterialModule,
    CoreModule,
    HttpClientModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
