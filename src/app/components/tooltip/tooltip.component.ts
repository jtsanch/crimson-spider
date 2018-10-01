import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';

@Component({
    selector: 'app-tooltip',
    templateUrl: './tooltip.component.html',
    styleUrls: ['./tooltip.component.scss']
})
export class TooltipComponent implements OnInit {

    @Input() public content: string;
    @Input() public element: ElementRef;

    @ViewChild('tooltip') tooltip: ElementRef;

    public visible: boolean = false;

    constructor() {
    }

    ngOnInit() {
        this.element.nativeElement.append(this.tooltip.nativeElement);
    }

    public showTooltip() {
        this.visible = true;
    }

    public hideTooltip() {
        setTimeout(() => {
            this.visible = false;
        }, 1500);
    }
}
