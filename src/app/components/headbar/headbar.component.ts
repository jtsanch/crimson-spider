import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { User } from 'firebase';
import { NavigationEnd, Router } from '@angular/router';
import { AlertService } from '../alert/alert.service';

@Component({
    selector: 'app-headbar',
    templateUrl: './headbar.component.html',
    styleUrls: ['./headbar.component.scss']
})
export class HeadbarComponent implements OnInit {

    public user: User;
    public loading: boolean = false;

    constructor(
        private _authService: AuthService,
        private _router: Router,
        private _alertService: AlertService,
    ) {
    }

    ngOnInit() {
        this.reloadUser();
        this._router.events.subscribe((val) => {
            if (val instanceof NavigationEnd) {
                this.reloadUser();
            }
        });
    }

    public reloadUser() {
        this.loading = true;
        this._authService.getUser().then((user: User) => {
            this.user = user;
            this.loading = false;
        });
    }

    public goToComparison() {
        this._router.navigate(['comparison']);
    }
    public logout() {
        this._authService.logout()
            .then(() => {
                this._router.navigate(['login']);
            })
            .catch(() => {
                this._alertService.showAlert('Unable to login!', 'danger');
            });
    }
}
