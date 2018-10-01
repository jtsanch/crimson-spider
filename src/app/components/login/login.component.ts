import { Component, HostListener, OnInit } from '@angular/core';
import { UserLoginModel, UserLoginUtil } from '../../models/user-login.model';
import { UserCreateModel, UserCreateUtil } from '../../models/user-create.model';
import { AuthService } from '../../services/auth/auth.service';
import { AlertService } from '../alert/alert.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

    public userLogin: UserLoginModel;
    public userCreate: UserCreateModel;

    public creating: boolean = false;
    public loading: boolean = false;

    constructor(
        private _authService: AuthService,
        private _alertService: AlertService,
        private _router: Router,
    ) {}

    ngOnInit() {
        this.userLogin = UserLoginUtil.getEmptyObject();
        this.userCreate = UserCreateUtil.getEmptyObject();
    }
    @HostListener('window:keyup', ['$event'])
    keyEvent(event: KeyboardEvent) {
        if (event.key !== 'Enter') {
            return;
        }
        if (this.creating) {
            this.createUser();
        } else {
            this.loginUser();
        }
    }

    loginUser() {
        this.loading = true;
        this._authService.login(this.userLogin.email, this.userLogin.password)
            .then(() => {
                this.loading = false;
                this._alertService.showAlert('User logged in', 'info');
                this._router.navigate(['/comparison']);
            })
            .catch((err) => {
                this.loading = false;
                this._alertService.showAlert('Unable to login user', 'danger');
            });
    }

    createUser() {
        this._authService.createUser(this.userCreate.email, this.userCreate.password)
            .then(() => {
                this.loading = false;
                this._alertService.showAlert('User created', 'info');
                this._router.navigate(['/comparison']);
            })
            .catch((err) => {
                this.loading = false;
                this._alertService.showAlert('Unable to create user', 'danger');
            });
    }

    toggleCreating() {
        this.creating = !this.creating;
    }
}
