import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FactorComponent } from './factor.component';
import { FormsModule } from '@angular/forms';

@NgModule({
    declarations: [
        FactorComponent,
    ],
    imports: [
        BrowserModule,
        FormsModule,
    ],
    exports: [
        FactorComponent,
    ]
})
export class FactorModule {}
