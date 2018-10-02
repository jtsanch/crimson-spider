import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AuthModule } from '../../services/auth/auth.module';
import { FeatureComponent } from './feature.component';
import { FormsModule } from '@angular/forms';
import { FactorServiceModule } from '../../services/factor/factor.service.module';
import { FeatureServiceModule } from '../../services/feature/feature-service.module';
import { AlertModule } from '../alert/alert.module';
import { TooltipModule } from '../tooltip/tooltip.module';

@NgModule({
    declarations: [
        FeatureComponent,
    ],
    imports: [
        BrowserModule,
        FormsModule,
        AuthModule,
        FactorServiceModule,
        FeatureServiceModule,
        AlertModule,
        TooltipModule,
    ],
    exports: [
        FeatureComponent,
    ]
})
export class FeatureModule {}
