
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import {Observable} from "rxjs/Rx";
import {Injectable} from "@angular/core";
import {Room} from "./room";
import {RoomService} from "./room.service";

@Injectable()
export class RoomsResolve implements Resolve<Room[]> {

    constructor(
        private roomService: RoomService
    ) {

    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Room[] | Observable<Room[]> | Promise<Room[]> {
        return this.roomService.getEntities();
    }


}