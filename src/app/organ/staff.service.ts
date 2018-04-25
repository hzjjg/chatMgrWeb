import {HttpClient} from "@angular/common/http";
import {Staff} from "./staff";
import {Observable} from "rxjs/Observable";
import {Injectable} from "@angular/core";
import {Subject} from "rxjs/Subject";
import {BehaviorSubject} from "rxjs/BehaviorSubject";

@Injectable()
export class StaffService {

    // private headers = new Headers({'Content-Type': 'application/json'});
    private staffUrl = '/staffs';

    private _staffs: BehaviorSubject<Staff[]>;

    constructor(
        private http: HttpClient
    ) {
        this._staffs = new BehaviorSubject<Staff[]>([]);

    }
    getStaffs(): Observable<any> {
        return this.http.get(`${this.staffUrl}`)
        // return Observable.of(
        //     [{"staffId":7,"username":"test","pwd":"123456","roleId":106,"name":"test1","contact":"123123","createTime":"2017-10-12 00:31","status":"Enable"},{"staffId":11,"username":"test2","pwd":"123456","roleId":106,"name":"test2","contact":"test2","createTime":"2017-11-08 23:01","status":"Enable"}]
        // ).delay(3000);
    }

    getStaff(staffId: number): Observable<any> {
        return this.http.get(`${this.staffUrl}/${staffId}`)
    }

    create(staff: Staff): Observable<any> {
        return this.http.post(`${this.staffUrl}`, staff);
    }
    update(staff: Staff): Observable<any> {
        return this.http.put(`${this.staffUrl}/${staff.staffId}`, staff);
    }
    delete(staffId: number): Observable<any> {
        return this.http.delete(`${this.staffUrl}/${staffId}`);
    }
    resetPassword(staffId: any, password: string): Observable<any> {
        return this.http.put(`${this.staffUrl}/${staffId}/pwd`, {
            pwd: password
        })
    }
}