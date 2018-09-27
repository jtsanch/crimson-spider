import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AlertComponent } from './alert.component';
import { AlertService } from './alert.service';

@NgModule({
    declarations: [
        AlertComponent
    ],
    imports: [
        BrowserModule,
    ],
    exports: [
        AlertComponent,
    ],
    providers: [
        AlertService,
    ]
})
export class AlertModule {
}
