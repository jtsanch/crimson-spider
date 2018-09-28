import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AuthService } from './auth.service';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AuthRouteGuard } from './auth-route.guard';

@NgModule({
    imports: [
        BrowserModule,
        AngularFireAuthModule,
    ],
    providers: [
        AuthService,
        AuthRouteGuard,
    ],
})
export class AuthModule {}
