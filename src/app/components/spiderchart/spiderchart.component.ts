import { Component, Input, OnChanges, OnInit, SimpleChange, SimpleChanges } from '@angular/core';
import * as Chart from '../../../../node_modules/chart.js/dist/Chart.js';
import { FeatureModel } from '../../models/feature.model';

@Component({
    selector: 'app-spiderchart',
    templateUrl: './spiderchart.component.html',
    styleUrls: ['./spiderchart.component.scss']
})
export class SpiderchartComponent implements OnInit, OnChanges {

    @Input() public features: FeatureModel[];
    public myChart: any;

    constructor() {
    }

    public ngOnChanges(changes: SimpleChanges) {
        if (changes.features && this.features.length) {
            this.renderChart()
        }
    }

    public renderChart() {
        const elem = <HTMLCanvasElement>document.getElementById("myChart");
        const ctx = elem.getContext('2d');

        const labels = this.features[0].factors.map((factor) => {
            return factor.title;
        });

        const datasets = this.features.map((feature) => {
            return {
                data: feature.factors.map((factor) => {
                    return factor.chosenValue;
                }),
                label: feature.title,
            };
        });
        this.myChart = new Chart(ctx, {
            type: 'radar',
            data: {
                labels,
                datasets,
            },
        });
    }
    ngOnInit() {
        this.renderChart();
    }

}
