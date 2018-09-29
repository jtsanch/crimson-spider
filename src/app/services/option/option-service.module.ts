import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { OptionService } from './option.service';

@NgModule({
    imports: [
        BrowserModule,
        AngularFireDatabaseModule,
    ],
    providers: [
        OptionService,
    ],
})
export class OptionServiceModule {}
