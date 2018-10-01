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
    @Input() public colors: string[];

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
        const enabledFeatures = this.features.filter(feature => feature.enabled);
        if (!enabledFeatures.length) {
            return;
        }

        const labels = enabledFeatures[0].factors.map((factor) => {
            return {
                title: factor.title
            };
        });
        const color = Chart.helpers.color;

        let index = -1;
        const datasets = enabledFeatures.map((feature) => {
            index++;
            return {
                data: feature.factors.map((factor) => {
                    return factor.chosenValue;
                }),
                label: feature.title,
                borderColor: this.colors[index],
                backgroundColor: color(this.colors[index]).alpha(0.2).rgbString(),
                fill: true,
                pointType: 'triangle',
            };
        });
        datasets.push({
            data: ['5', '5', '5', '5', '5'],
            borderColor: 'transparent',
            backgroundColor: 'transparent',
            fill: false,
            label: '',
            pointType: 'none',
        });
        datasets.push({
            data: ['0', '0', '0', '0', '0'],
            borderColor: 'transparent',
            backgroundColor: 'transparent',
            fill: false,
            label: '',
            pointType: 'none',
        });
        this.myChart = new Chart(ctx, {
            type: 'radar',
            data: {
                labels,
                datasets,
            },
            options: {
                legend: {
                    labels: {
                        // This more specific font property overrides the global property
                        fontColor: 'black',
                        defaultFontFamily: 'Roboto sans-serif',
                        defaultFontSize: '28px,'
                    },
                },
            },
        });
    }
    ngOnInit() {
        this.renderChart();
    }

}
