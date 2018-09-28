import { Injectable } from '@angular/core';
import {
    Router,
    CanActivate,
    ActivatedRouteSnapshot,
    RouterStateSnapshot,
} from '@angular/router';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs/Observable';
import { AngularFireAuth } from '@angular/fire/auth';
import { User } from 'firebase';

@Injectable()
export class AuthRouteGuard implements CanActivate {
    constructor(
        private _router: Router,
        private _auth: AuthService,
    ) {}

    public canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot,
    ): Promise<boolean> {
        const isLoginRequired: boolean =
            (route.data && route.data.auth && !!route.data.auth.isLoginRequired) ||
            false;

        const isNotLoggedInRequired: boolean = (route.data && route.data.auth && route.data.auth.notLoggedInRequired) || false;

        if(isLoginRequired && !isNotLoggedInRequired) {
            return this._auth.isLoggedIn()
                .then((loggedIn) => {
                    if( loggedIn ) {
                        return true;
                    } else {
                        this._router.navigate(['/login']);
                        return false;
                    }
                });
        }

        if (isNotLoggedInRequired) {
            return this._auth.isLoggedIn()
                .then((loggedIn) => {
                    return !loggedIn;
                });
        }

        return Promise.resolve(true);
    }
}
