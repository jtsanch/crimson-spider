import { Injectable } from '@angular/core';
import { AlertModel } from '../../models/alert.model';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class AlertService {

    public alert: Subject<AlertModel> = new Subject<AlertModel>();

    public showAlert(content: string, type: string, time: number = 1500) {
        this.alert.next({
            content,
            type,
            time,
        });
    }
}
