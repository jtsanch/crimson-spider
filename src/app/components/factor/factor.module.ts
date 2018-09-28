import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FactorComponent } from './factor.component';
import { FormsModule } from '@angular/forms';
import { FactorServiceModule } from '../../services/factor/factor.service.module';
import { LoaderModule } from '../loader/loader.module';

@NgModule({
    declarations: [
        FactorComponent,
    ],
    imports: [
        BrowserModule,
        FormsModule,
        FactorServiceModule,
        LoaderModule,
    ],
    exports: [
        FactorComponent,
    ]
})
export class FactorModule {}
