import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AuthModule } from '../../services/auth/auth.module';
import { HeadbarComponent } from './headbar.component';
import { TooltipModule } from '../tooltip/tooltip.module';

@NgModule({
    declarations: [
        HeadbarComponent,
    ],
    imports: [
        BrowserModule,
        AuthModule,
        TooltipModule,
    ],
    exports: [
        HeadbarComponent,
    ]
})
export class HeadbarModule {}
