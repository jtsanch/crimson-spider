import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { FeatureService } from './feature.service';

@NgModule({
    imports: [
        BrowserModule,
        AngularFireDatabaseModule,
    ],
    providers: [
        FeatureService,
    ],
})
export class FeatureServiceModule {}
