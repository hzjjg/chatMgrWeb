
import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs/Observable";
import {EntityService} from "../shared/entity.service";
import {Role} from "./role";
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {Subscription} from "rxjs/Subscription";

@Injectable()
export class RoleService extends EntityService<Role> {

    // private _roles: BehaviorSubject<Role[]>;
    // private _roleSubscription: Subscription;
    // private store: {
    //     roles: Role[]
    // };

    constructor(
        http: HttpClient
    ) {
        super("/roles", "roleId", http);
        // this._roles = new BehaviorSubject<Role[]>([]);
        // this._roleSubscription = this._roles.subscribe((roles: Role[]) => {
        //     this.store.roles = roles;
        // });
    }

    // get roles() : Observable<Role[]> {
    //     return this._roles.asObservable();
    // }

    // create(role: Role) {
    //     return super.create(role).subscribe((roleInfo: Role) => {
            // roleInfo = Object.assign({}, role, roleInfo);
            // this._roles.next(this.store.roles.concat([roleInfo]));
        // });
    // }

}