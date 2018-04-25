import { Component, OnInit } from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import {Room} from "./room";

@Component({
    selector: 'room-mgr',
    templateUrl: 'room-mgr.component.html',
    styleUrls: ['room-mgr.component.scss'],
    host: {
        'class': 'container-fluid mx-3 my-3'
    }
})
export class RoomMgrComponent implements OnInit {

    constructor(

    ) {

    }

    ngOnInit() {

    }
}