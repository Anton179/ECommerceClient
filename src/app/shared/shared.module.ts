import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from './material/material.module';
@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        MaterialModule
    ],
    declarations: [
  ],
    exports: [CommonModule]
})

export class SharedModule {}