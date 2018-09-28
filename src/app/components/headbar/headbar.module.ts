import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AuthModule } from '../../services/auth/auth.module';
import { HeadbarComponent } from './headbar.component';

@NgModule({
    declarations: [
        HeadbarComponent,
    ],
    imports: [
        BrowserModule,
        AuthModule,
    ],
    exports: [
        HeadbarComponent,
    ]
})
export class HeadbarModule {}
