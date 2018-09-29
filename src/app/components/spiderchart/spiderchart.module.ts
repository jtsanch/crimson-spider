import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AuthModule } from '../../services/auth/auth.module';
import { SpiderchartComponent } from './spiderchart.component';

@NgModule({
    declarations: [
        SpiderchartComponent,
    ],
    imports: [
        BrowserModule,
        AuthModule,
    ],
    exports: [
        SpiderchartComponent,
    ]
})
export class SpiderchartModule {}
