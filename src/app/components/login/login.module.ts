import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { LoginComponent } from './login.component';
import { FormsModule } from '@angular/forms';
import { AuthModule } from '../../services/auth/auth.module';
import { LoaderModule } from '../loader/loader.module';
import { AlertModule } from '../alert/alert.module';

@NgModule({
    declarations: [
        LoginComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        AuthModule,
        LoaderModule,
        AlertModule,
    ],
    exports: [
        LoginComponent,
    ]
})
export class LoginModule {
}
