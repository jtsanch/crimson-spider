import { Component, OnInit } from '@angular/core';
import { OptionService } from '../../services/option/option.service';
import { OptionModel, OptionUtil } from '../../models/option.model';
import { FactorService } from '../../services/factor/factor.service';
import { FactorModel } from '../../models/factor.model';
import { AlertService } from '../alert/alert.service';

@Component({
    selector: 'app-option',
    templateUrl: './option.component.html',
    styleUrls: ['./option.component.scss']
})
export class OptionComponent implements OnInit {

    public option: OptionModel;
    public creating: boolean = false;
    public editMode: boolean = false;
    public loading: boolean = false;
    public oneLoaded: boolean = false;

    public options: OptionModel[];
    public factors: FactorModel[];

    constructor(
        private _alertService: AlertService,
        private _optionService: OptionService,
        private _factorService: FactorService) {
    }

    ngOnInit() {
        this.reloadOptions();
        this.loading = true;
        this._factorService.getFactors()
            .then((factors: FactorModel[]) => {
                this.factors = factors;
                if (this.oneLoaded) {
                    this.loading = false;
                }
                this.oneLoaded = true;
            });
    }

    public enterCreateMode() {
        this.creating = true;
        this.editMode = false;
        this.option = OptionUtil.getEmptyObject();
    }

    public enterEditMode(option: OptionModel) {
        this.creating = false;
        this.editMode = true;
        this.option = option;
    }

    public reloadOptions() {
        this.loading = true;
        this._optionService.getOptions()
            .then((options: OptionModel[]) => {
                this.options = options;
                if (this.oneLoaded) {
                    this.loading = false;
                }
                this.oneLoaded = true;
            });
    }

    public optionHasFactor(factor: FactorModel): boolean {
        return !!this.option.factors.find((optionFactor: FactorModel) => {
            return factor.key === optionFactor.key;
        });
    }

    public addFactorToOption(factor: FactorModel) {
        if (!this.optionHasFactor(factor)) {
            this.option.factors.push(factor);
        }
    }

    public removeFactorFromOption(factor: FactorModel) {
        const index = this.option.factors.findIndex((optionFactor: FactorModel) => {
            return optionFactor.key === factor.key;
        });
        this.option.factors.splice(index, 1);
    }

    public createOption() {
        this.loading = true;
        this._optionService.createOption(this.option)
            .then(() => {
                this.loading = false;
                this.reloadOptions();
                this._alertService.showAlert('Option created!', 'info');
            })
            .catch(() => {
                this.loading = false;
                this._alertService.showAlert('Unable to create option', 'info');
            });
    }
}
