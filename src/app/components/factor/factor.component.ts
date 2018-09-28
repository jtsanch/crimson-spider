import { Component, OnInit } from '@angular/core';
import { FactorModel, FactorUtil } from '../../models/factor.model';
import { FactorService } from '../../services/factor/factor.service';
import { AngularFireList } from '@angular/fire/database';
import { AlertService } from '../alert/alert.service';

@Component({
    selector: 'app-factor',
    templateUrl: './factor.component.html',
    styleUrls: ['./factor.component.css']
})
export class FactorComponent implements OnInit {

    public factors: FactorModel[];

    public factor: FactorModel;
    public creating: boolean = false;
    public editMode: boolean = false;
    public loading: boolean = false;

    constructor(
        private _factorService: FactorService,
        private _alertService: AlertService,
    ) {}

    public enterCreateMode() {
        this.creating = true;
        this.editMode = false;
        this.factor = FactorUtil.getEmptyObject();
    }

    public enterEditMode(factor: FactorModel) {
        this.factor = factor;
        this.creating = false;
        this.editMode = true;
    }

    public exitSubmitMode() {
        this.creating = false;
        this.editMode = false;
    }

    public submitFactor() {
        this.loading = true;
        if (this.creating) {
            this._factorService.createFactor(this.factor)
                .then(() => {
                    this.loading = false;
                    this._alertService.showAlert('Factor Created!', 'info');
                    this.reloadFactors();
                    this.creating = false;
                });
        } else {
            this._factorService.updateFactor(this.factor)
                .then(() => {
                    this.loading = false;
                    this.editMode = false;
                    this._alertService.showAlert('Factor Updated!', 'info');
                    this.reloadFactors();
                })
        }
    }

    public reloadFactors() {
        this._factorService.getFactors()
            .then((factors) => {
                this.factors = factors;
            });
    }

    ngOnInit() {
        this.reloadFactors();
        this.factor = FactorUtil.getEmptyObject();
    }
}
