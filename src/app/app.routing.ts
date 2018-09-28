import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { OptionComponent } from './components/option/option.component';
import { AuthRouteGuard } from './services/auth/auth-route.guard';
import { FactorComponent } from './components/factor/factor.component';

export const appRoutes: Routes = [
    {
        path: 'option',
        component: OptionComponent,
        canActivate: [AuthRouteGuard],
        data: {
            auth: {
                isLoginRequired: true,
            },
        },
    },
    {
        path: 'factor',
        component: FactorComponent,
        canActivate: [AuthRouteGuard],
        data: {
            auth: {
                isLoginRequired: true,
            },
        },
    },
    {
        path: 'login',
        component: LoginComponent,
        canActivate: [AuthRouteGuard],
        data: {
            auth: {
                notLoggedInRequired: true,
            }
        }
    },
    { path: '**', redirectTo: '/option' }
];