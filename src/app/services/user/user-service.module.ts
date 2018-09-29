import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { UserService } from './user.service';

@NgModule({
    imports: [
        BrowserModule,
        AngularFireDatabaseModule,
    ],
    providers: [
        UserService,
    ],
})
export class UserServiceModule {}
