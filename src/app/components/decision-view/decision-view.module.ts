import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AuthModule } from '../../services/auth/auth.module';
import { DecisionViewComponent } from './decision-view.component';
import { SpiderchartModule } from '../spiderchart/spiderchart.module';
import { LoaderModule } from '../loader/loader.module';
import { AlertModule } from '../alert/alert.module';
import { FeatureModule } from '../feature/feature.module';
import { FormsModule } from '@angular/forms';
import { UserServiceModule } from '../../services/user/user-service.module';

@NgModule({
    declarations: [
        DecisionViewComponent,
    ],
    imports: [
        BrowserModule,
        AuthModule,
        SpiderchartModule,
        LoaderModule,
        AlertModule,
        FeatureModule,
        UserServiceModule,
        FormsModule,
    ],
    exports: [
        DecisionViewComponent,
    ]
})
export class DecisionViewModule {}
