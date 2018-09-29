import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { OptionComponent } from './option.component';
import { OptionServiceModule } from '../../services/option/option-service.module';
import { FactorServiceModule } from '../../services/factor/factor.service.module';
import { AlertModule } from '../alert/alert.module';
import { FormsModule } from '@angular/forms';

@NgModule({
    declarations: [
        OptionComponent,
    ],
    imports: [
        BrowserModule,
        OptionServiceModule,
        FactorServiceModule,
        AlertModule,
        FormsModule,
    ],
    exports: [
        OptionComponent,
    ]
})
export class OptionModule {}
