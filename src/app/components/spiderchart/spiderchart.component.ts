import { Component, HostListener, Input, OnChanges, OnInit, SimpleChange, SimpleChanges } from '@angular/core';
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

    public chartWidth: number;
    public chartHeight: number;
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
            return factor.title;
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
        this.myChart = new Chart(ctx, {
            type: 'radar',
            data: {
                labels,
                datasets,
            },
            options: {
                spanGaps: false,
                responsive: true,
                maintainAspectRatio: false,
                fullWidth: true,
                fullHeight: true,
                elements: {
                    line: {
                        tension: 0.000001
                    },
                },
                scale: {
                    pointLabels: {
                        fontSize: 20,
                    },
                    yAxis: {
                        ticks: {
                            padding: 10,
                        },
                    },
                    ticks: {
                        stepSize: 1,
                        suggestedMin: 0,
                        suggestedMax: 5,
                        fontSize: 18,
                    }
                },
                legend: {
                    display: false,
                }
            },
        });
    }

    @HostListener('window:resize', ['$event'])
    onResize(event?) {
        this.chartHeight = parseInt(''+window.innerHeight*.8);
        this.chartWidth = parseInt(''+window.innerWidth*.1);
        this.myChart.update();
    }

    ngOnInit() {
        this.onResize();
        this.renderChart();
    }

}
