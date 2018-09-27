import { Component } from '@angular/core';
import { AlertService } from './alert.service';
import { Observable } from 'rxjs/Observable';
import { AlertModel } from '../../models/alert.model';

@Component({
    selector: 'app-alert',
    templateUrl: './alert.component.html',
    styleUrls: ['./alert.component.scss']
})
export class AlertComponent {

    public type: string;
    public content: string;
    public alertOn: boolean = false;

    private _alertObservable: Observable<AlertModel>;

    constructor(private _alertService: AlertService) {
        this._alertObservable = this._alertService.alert;
        this._alertObservable.subscribe((alert: AlertModel) => {
            this.showAlert(alert);
        });
    }

    showAlert(alert: AlertModel) {
        this.type = alert.type;
        this.content = alert.content;
        this.alertOn = true;
        setTimeout(() => {
            this.alertOn = false;
        }, alert.time);
    }
}
