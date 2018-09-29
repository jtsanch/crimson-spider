import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { OptionModel } from '../../models/option.model';
import { FeatureModel } from '../../models/feature.model';
import { UserService } from '../../services/user/user.service';
import { FeatureService } from '../../services/feature/feature.service';
import { FactorService } from '../../services/factor/factor.service';
import { AlertService } from '../alert/alert.service';

@Component({
    selector: 'app-feature',
    templateUrl: './feature.component.html',
    styleUrls: ['./feature.component.css']
})
export class FeatureComponent implements OnInit, OnChanges {

    @Input() public feature: FeatureModel;
    @Input() public creating: boolean;

    @Output() public onUpdateChart: EventEmitter<void> = new EventEmitter<void>();
    @Output() public onCancelCreateFeature: EventEmitter<void> = new EventEmitter<void>();
    @Output() public onFeatureCreated: EventEmitter<void> = new EventEmitter<void>();

    public loading: boolean = false;

    constructor(
        private _featureService: FeatureService,
        private _factorService: FactorService,
        private _alertService: AlertService,
    ) {
    }

    ngOnInit() {
        if (this.creating) {
            this.initializeAndSetEnabledFactors();
        }
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes.creating) {
            this.initializeAndSetEnabledFactors();
        }
    }

    public createFeature() {
        this._featureService.createFeature(this.feature)
            .then(() => {
                this._alertService.showAlert('Feature created', 'info');
                this.onFeatureCreated.emit();
            })
            .catch(() => {
                this._alertService.showAlert('Unable to create feature', 'danger');
            })

    }

    public cancelCreateFeature() {
        this.onCancelCreateFeature.emit();
    }

    public updateChart(): void {
        this.onUpdateChart.emit();
    }

    initializeAndSetEnabledFactors() {
        if (!this.feature) {
            return;
        }
        this.loading = true;
        this._factorService.getFactors()
            .then((factors) => {
                this.feature.factors = factors.filter(factor => factor.enabled);
                this.feature.factors = this.feature.factors.map((feature) => {
                    feature.chosenValue = feature.chosenValue || '1';
                    return feature;
                });
                this.loading = false;
            });
    }
}
