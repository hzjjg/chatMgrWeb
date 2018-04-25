
import {Injectable} from "@angular/core";
import {Staff} from "../organ/staff";
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {Observable} from "rxjs/Rx";
import "rxjs/Rx";
import 'rxjs/add/operator/map';
import {UserProfile} from "./user-profile";

@Injectable()
export class UserService {

    private url = '/user';

    private _user: BehaviorSubject<Staff>;
    get user() {
        return this._user;
    }

    constructor(
        private http: HttpClient
    ) {
        this._user = new BehaviorSubject<Staff>(null);
    }

    //拉取
    fetch() : Observable<any> {
        return this.http.get(this.url).map((value: Staff) => {
            this._user.next(value);
            return value;
        });
    }

    getProfile(): Observable<any> {
        return this.http.get(`${this.url}/profile`);
    }

    //更新
    updateProfile(user: UserProfile) : Observable<any> {
        return this.http.put(`${this.url}/profile`, user)
    }

    //密码修改
    modifyPwd(pwd: string, newPwd: string) : Observable<any> {
        return this.http.put(this.url + '/password', {
            pwd,
            newPwd
        })
    }

    getSecurity():Observable<any>{
        return this.http.get(`${this.url}/security`);
    }

    logout() {
        return this.http.delete(`/session`);
    }


}