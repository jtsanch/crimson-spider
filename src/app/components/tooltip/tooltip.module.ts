import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AuthModule } from '../../services/auth/auth.module';
import { TooltipComponent } from './tooltip.component';

@NgModule({
    declarations: [
        TooltipComponent,
    ],
    imports: [
        BrowserModule,
        AuthModule,
    ],
    exports: [
        TooltipComponent,
    ]
})
export class TooltipModule {}
