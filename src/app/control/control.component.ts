import { Component, OnInit } from "@angular/core";

@Component({
    selector: 'control',
    templateUrl: 'control.component.html',
    styleUrls: ['control.component.scss'],
    host: {
        "class": "container-fluid mx-3 my-3",
    }
})
export class ControlComponent implements OnInit {
    constructor() {}
    ngOnInit() {}
}