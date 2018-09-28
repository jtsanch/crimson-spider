import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AuthModule } from '../../services/auth/auth.module';
import { SurveyComponent } from './survey.component';

@NgModule({
    declarations: [
        SurveyComponent,
    ],
    imports: [
        BrowserModule,
        AuthModule,
    ],
    exports: [
        SurveyComponent,
    ]
})
export class SurveyModule {}
