import {
    Component,
    EventEmitter,
    HostListener,
    Input,
    OnChanges,
    OnInit,
    Output,
    SimpleChanges,
    ViewChild
} from '@angular/core';
import { OptionModel } from '../../models/option.model';
import { FeatureModel } from '../../models/feature.model';
import { UserService } from '../../services/user/user.service';
import { FeatureService } from '../../services/feature/feature.service';
import { FactorService } from '../../services/factor/factor.service';
import { AlertService } from '../alert/alert.service';
import { NgForm } from '@angular/forms';

@Component({
    selector: 'app-feature',
    templateUrl: './feature.component.html',
    styleUrls: ['./feature.component.scss']
})
export class FeatureComponent implements OnInit, OnChanges {

    @ViewChild('featureForm') featureForm: NgForm;
    @Input() public feature: FeatureModel;
    @Input() public creating: boolean;
    @Input() public color: string;

    @Output() public onUpdateChart: EventEmitter<void> = new EventEmitter<void>();
    @Output() public onCancelCreateFeature: EventEmitter<void> = new EventEmitter<void>();
    @Output() public onFeatureCreated: EventEmitter<void> = new EventEmitter<void>();
    @Output() public featureInCreationOutput: EventEmitter<boolean> = new EventEmitter<boolean>();
    @Output() public onDelete: EventEmitter<FeatureModel> = new EventEmitter<FeatureModel>();

    public loading: boolean = false;
    public radioButtonsOn: boolean = false;
    public featureInCreation: boolean = false;
    public featureHovered: boolean = false;

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
            this.radioButtonsOn = true;
        }
    }

    public deleteFeature() {
        this.onDelete.emit(this.feature);
    }

    public onHoverIn() {
        this.featureHovered = true;
    }

    public onHoverOut() {
        this.featureHovered = false;
    }

    public toggleEnableFeature() {
        this.feature.enabled = !this.feature.enabled;
        this.onUpdateChart.emit();
    }

    public toggleRadioButtons() {
        if (this.creating) {
            this.onCancelCreateFeature.emit();
        }
        this.radioButtonsOn = !this.radioButtonsOn;
    }

    public createFeature() {
        if (this.featureForm.invalid || this.featureInCreation) {
            this._alertService.showAlert('Please enter a feature name', 'danger');
            return;
        }
        this.featureInCreation = true;
        this.featureInCreationOutput.emit(true);
        this._featureService.createFeature(this.feature)
            .then(() => {
                this.featureInCreationOutput.emit(false);
                this.featureInCreation = false;
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
        if (!this.feature.enabled) {
            return;
        }
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
                    feature.chosenValue = feature.chosenValue || '0';
                    return feature;
                });
                this.loading = false;
            });
    }
}
