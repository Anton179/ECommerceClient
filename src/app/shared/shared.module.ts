import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from './layout/header/header.component';
import { FooterComponent } from './layout/footer/footer.component';
import { MaterialModule } from './material/material.module';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        MaterialModule
    ],
    declarations: [
      HeaderComponent,
      FooterComponent
  ],
    exports: [
      CommonModule,
      HeaderComponent,
      FooterComponent
    ]
})

export class SharedModule {}