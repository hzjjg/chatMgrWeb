
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import {UserProfile} from "./user-profile";
import {Injectable} from "@angular/core";
import {UserService} from "./user.service";
import {Observable} from "rxjs/Observable";

@Injectable()
export class UserProfileResolve implements Resolve<UserProfile> {

    constructor(
        private userService: UserService
    ) {

    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<UserProfile> | Promise<UserProfile> | UserProfile {
        return this.userService.getProfile();
    }

}