import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { FactorService } from './factor.service';

@NgModule({
    imports: [
        BrowserModule,
        AngularFireDatabaseModule,
    ],
    providers: [
        FactorService,
    ],
})
export class FactorServiceModule {}
