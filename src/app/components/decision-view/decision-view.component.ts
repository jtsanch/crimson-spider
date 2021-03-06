import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { AlertService } from '../alert/alert.service';
import { FeatureModel, FeatureUtil } from '../../models/feature.model';
import { UserService } from '../../services/user/user.service';
import { UserServiceModel } from '../../models/user.model';
import { SpiderchartComponent } from '../spiderchart/spiderchart.component';
import { FeatureComponent } from '../feature/feature.component';

@Component({
    selector: 'app-decision-view',
    templateUrl: './decision-view.component.html',
    styleUrls: ['./decision-view.component.scss']
})
export class DecisionViewComponent implements OnInit {

    @ViewChild('spiderchart') spiderchart: SpiderchartComponent;
    @ViewChild(FeatureComponent) featureComponent: FeatureComponent;

    public loading: boolean = false;
    public creating: boolean = false;
    public user: UserServiceModel;
    public feature: FeatureModel;
    public colors: string[];

    constructor(
        private _alertService: AlertService,
        private _userService: UserService,
    ) {}

    private _initColors(): void {
        this.colors = [
            '#FFFD82',
            '#A1FCDF',
            '#ABA9BF',
            '#2E4057',
            '#FFD046',
            '#FF9B71',
        ];
    }

    @HostListener('window:keyup', ['$event'])
    keyEvent(event: KeyboardEvent) {
        if (!this.creating) {
            return;
        }
        if (event.key === 'Enter') {
            this.featureComponent.createFeature();
        }

        if (event.key === 'Escape') {
            this.onCancelCreate();
        }
    }

    public setFeatureLoading(loading: boolean) {
        this.loading = loading;
    }
    public getCurrentColor(): string {
        const index = this.user.features.length ? this.user.features.length + 1 : 0;
        return this.colors[index];
    }

    public deleteFeature(feature: FeatureModel): void {
        const index = this.user.features.findIndex(userFeature => {
            return feature.title === userFeature.title;
        });
        this.user.features.splice(index,1);
        this._userService.updateUser(this.user)
            .then(() => {
                this._alertService.showAlert('Feature Deleted', 'info');
                this.reloadUser();
            })
    }

    public updateChart(): void {
        this._userService.updateUser(this.user);
        this.spiderchart.renderChart();
    }

    public setEnabled(event: {val: boolean, survey: FeatureModel}): void {
        event.survey.enabled = event.val;
    }

    public onFeatureCreate() {
        this.creating = false;
        this.reloadUser();
    }

    public onCancelCreate() {
        this.creating = false;
    }

    public drag(event) {
        console.log(event)
    }

    public drop(event) {
        console.log(event)
    }

    public allowDrop(event) {
        console.log(event);
    }

    public createFeature() {
        if (this.user.features.length >= 5) {
            this._alertService.showAlert('Limit of 5 Features per User', 'danger');
            return;
        }
        this.creating = true;
        this.feature = FeatureUtil.getEmptyObject();
    }

    public reloadUser(): void {
        this.loading = true;
        this._userService.getCurrentUser()
            .then((user) => {
                this.loading = false;
                this.user = user;
            })
    }

    ngOnInit() {
        this.reloadUser();
        this._initColors();
    }
}
