import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AlertService } from '../alert/alert.service';
import { OptionService } from '../../services/option/option.service';
import { FeatureModel, FeatureUtil } from '../../models/feature.model';
import { UserService } from '../../services/user/user.service';
import { UserServiceModel } from '../../models/user.model';
import { SpiderchartComponent } from '../spiderchart/spiderchart.component';

@Component({
    selector: 'app-decision-view',
    templateUrl: './decision-view.component.html',
    styleUrls: ['./decision-view.component.css']
})
export class DecisionViewComponent implements OnInit {

    @ViewChild('spiderchart') spiderchart: SpiderchartComponent;

    public loading: boolean = false;
    public creating: boolean = false;
    public user: UserServiceModel;
    public feature: FeatureModel;

    constructor(
        private _alertService: AlertService,
        private _optionService: OptionService,
        private _userService: UserService,
    ) {}

    public updateChart(): void {
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

    public createFeature() {
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
    }
}
