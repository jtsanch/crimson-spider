import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { AuthRouteGuard } from './services/auth/auth-route.guard';
import { FactorComponent } from './components/factor/factor.component';
import { DecisionViewComponent } from './components/decision-view/decision-view.component';

export const appRoutes: Routes = [
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
        path: 'comparison',
        component: DecisionViewComponent,
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
    { path: '**', redirectTo: '/login' }
];