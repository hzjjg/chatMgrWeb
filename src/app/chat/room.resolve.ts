
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import {Observable} from "rxjs/Rx";
import {Injectable} from "@angular/core";
import {Room} from "./room";
import {RoomService} from "./room.service";

@Injectable()
export class RoomResolve implements Resolve<Room> {

    constructor(
        private roomService: RoomService
    ) {

    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Room | Observable<Room> | Promise<Room> {
        let roomNo = route.parent.params.roomNo;
        return this.roomService.getEntity(roomNo);
    }


}