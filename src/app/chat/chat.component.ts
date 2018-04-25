import { Component, OnInit } from "@angular/core";
import {Room} from "./room";
import {RoomService} from "./room.service";
import {ActivatedRoute, ActivatedRouteSnapshot, Router} from "@angular/router";

@Component({
    templateUrl: 'chat.component.html',
    styleUrls: ['chat.component.scss'],
    host: {
        "class": "w-100"
    }
})
export class ChatComponent implements OnInit {
    rooms: Room[] = [];

    constructor(
        private roomService: RoomService,
        private activatedRoute: ActivatedRoute,
        private router : Router
    ) {

    }
    ngOnInit() {
        this.rooms = this.activatedRoute.snapshot.data.rooms;
        // let snapshot: ActivatedRouteSnapshot = this.activatedRoute.snapshot.children[0];
        // let matchRoomNo = snapshot.params.roomNo;
        if (this.rooms && this.rooms.length > 0 &&
            this.activatedRoute.snapshot.children.length == 1) {
            let room: Room = this.rooms[0];

            //查看当前匹配的
            this.router.navigate([`rooms/${room.roomNo}`]).then(() => {

            });
        }
        //
        // this.roomService.getEntities().subscribe((rooms: Room[]) => {
        //     this.rooms = rooms;
        // });

        //this.router.navigate(['../../'], { relativeTo: this.activatedRoute, queryParamsHandling: 'preserve' });
        // <a routerLink="../../" queryParamsHandling="preserve">

    }
}