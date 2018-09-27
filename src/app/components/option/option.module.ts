import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { OptionComponent } from './option.component';
import { AuthModule } from '../../services/auth/auth.module';

@NgModule({
    declarations: [
        OptionComponent,
    ],
    imports: [
        BrowserModule,
        AuthModule,
    ],
    exports: [
        OptionComponent,
    ]
})
export class OptionModule {}
