

import {Injectable} from "@angular/core";
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {Robot} from "./robot";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs/Observable";


@Injectable()
export class RobotService {

    private robotUrl = '/room-robots';

    private _robots: BehaviorSubject<Robot[]>

    constructor(
        private http: HttpClient
    ) {
       this._robots = new BehaviorSubject<Robot[]>([])
    }

    get(
        roomNo: string
    ): Observable<any> {
        let params = new HttpParams()
            .set("roomNo", roomNo);
        return this.http.get(`${this.robotUrl}`, {
            params: params
        })
        // return Observable.of(
        //     [
        //         {
        //             robotId: 1,
        //             roomNo: '21',
        //             userType: 'Visitor',
        //             username: '张三',
        //             nickname: '张小三',
        //             avatar: './images/avatar/0.png',
        //             personalSignature: '假的个性签名',
        //             createTime: 136237482932101
        //         },
        //         {
        //             robotId: 2,
        //             roomNo: '21',
        //             userType: 'Visitor',
        //             username: '李四',
        //             nickname: '大狸子',
        //             avatar: './images/avatar/0.png',
        //             personalSignature: '假的个性签名',
        //             createTime: 136237488932101
        //         }
        //     ]
        // ).delay(1000)
    }
    create(robot: Robot): Observable<any> {
        return this.http.post(`${this.robotUrl}`, robot)
    }
    update(robot: Robot): Observable<any> {
        return this.http.put(`${this.robotUrl}/${robot.robotId}`, robot)
    }
    delete(robot: Robot): Observable<any> {
        return this.http.delete(`${this.robotUrl}/${robot.robotId}`)
    }

    getRobotAutomatic(): Observable<any> {
        return this.http.get(`/data/build-nickname`);
    }
}