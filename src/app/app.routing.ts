import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { OptionComponent } from './components/option/option.component';

export const appRoutes: Routes = [
    { path: 'option', component: OptionComponent },
    { path: 'login', component: LoginComponent },
    { path: '**', redirectTo: '/login' }
];