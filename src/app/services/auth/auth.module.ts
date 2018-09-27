import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AuthService } from './auth.service';
import { AngularFireAuthModule } from '@angular/fire/auth';

@NgModule({
    imports: [
        BrowserModule,
        AngularFireAuthModule,
    ],
    providers: [
        AuthService,
    ],
})
export class AuthModule {}
