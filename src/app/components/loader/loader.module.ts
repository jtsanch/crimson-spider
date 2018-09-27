import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { LoaderComponent } from './loader.component';

@NgModule({
    declarations: [
        LoaderComponent
    ],
    imports: [
        BrowserModule,
    ],
    exports: [
        LoaderComponent,
    ]
})
export class LoaderModule {
}
