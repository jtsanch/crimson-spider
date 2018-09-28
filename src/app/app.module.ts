import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';

import { AppComponent } from './app.component';
import { environment } from '../environments/environment.prod';
import { AlertModule } from './components/alert/alert.module';
import { LoginModule } from './components/login/login.module';
import { RouterModule } from '@angular/router';
import { appRoutes } from './app.routing';
import { HeadbarModule } from './components/headbar/headbar.module';
import { FactorModule } from './components/factor/factor.module';
import { OptionModule } from './components/option/option.module';

@NgModule({
    declarations: [
        AppComponent,
    ],
    imports: [
        BrowserModule,
        AlertModule,
        LoginModule,
        HeadbarModule,
        FactorModule,
        OptionModule,
        AngularFireModule.initializeApp(environment.firebase),
        RouterModule.forRoot(
            appRoutes,
            { enableTracing: true } // <-- debugging purposes only
        )
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
