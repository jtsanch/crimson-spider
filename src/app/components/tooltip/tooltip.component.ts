import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';

@Component({
    selector: 'app-tooltip',
    templateUrl: './tooltip.component.html',
    styleUrls: ['./tooltip.component.scss']
})
export class TooltipComponent {

    @Input() public content: string;

    @ViewChild('tooltip') tooltip: ElementRef;

    public visible: boolean = false;

    constructor() {
    }

    public showTooltip() {
        this.visible = true;
    }

    public hideTooltip() {
        this.visible = false;
    }
}
