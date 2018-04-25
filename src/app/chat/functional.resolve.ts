
import {Functional} from "./functional";
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import {RoomService} from "./room.service";
import {Observable} from "rxjs/Observable";
import {Injectable} from "@angular/core";

@Injectable()
export class FunctionalResolve implements Resolve<Functional> {
    constructor(
        private roomService: RoomService
    ) {

    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Functional | Observable<Functional> | Promise<Functional> {
        let roomNo = route.parent.params.roomNo;
        return this.roomService.fetchFunctional(roomNo);
    }

}