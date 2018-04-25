
import {Staff} from "../organ/staff";
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import {UserService} from "./user.service";
import {Observable} from "rxjs/Observable";
import {Injectable} from "@angular/core";
import {Subject} from "rxjs/Subject";

@Injectable()
export class UserResolve implements Resolve<Staff> {

    constructor(
        private userService: UserService
    ) {

    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Staff | Observable<Staff> | Promise<Staff> {
        // if (this.userService.user.value) {
        //     return this.userService.user.value;
        // }
        // let subject: Subject<Staff> = new Subject<Staff>();
        // this.userService.user.filter((value: Staff, index: number) => {
        //     return value != null;
        // }).subscribe(function(value) {
        //     subject.next(value);
        //     subject.complete();
        // });
        return this.userService.fetch();
        // return subject.asObservable();
    }


}