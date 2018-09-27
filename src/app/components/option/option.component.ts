import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { User } from 'firebase';

@Component({
    selector: 'app-option',
    templateUrl: './option.component.html',
    styleUrls: ['./option.component.css']
})
export class OptionComponent implements OnInit {

    public user: User;
    constructor(
        private _authService: AuthService,
    ) {
    }

    ngOnInit() {
        this.user = this._authService.getUser();
    }

}
