import {Injectable} from "@angular/core";
import {Observable} from "rxjs/Observable";
import {HttpClient, HttpParams} from "@angular/common/http";
import {RoomPlan} from "./room";

@Injectable()
export class RoomPlanService {

    constructor(
        private http: HttpClient
    ) {

    }

    get(
        roomNo: string
    ): Observable<any> {
        const params = new HttpParams()
            .set('roomNo', roomNo);
        return this.http.get(`/room-plans`, {
            params: params
        })

        // return Observable.of(
        //     [
        //         {
        //             planId: '1',
        //             roomNo: '123',
        //             code: 'cd',
        //             template: '[plan]',
        //             newestTime: '2017-12-22',
        //             lastPullTime: 12345678900,
        //             createTime: 12345678900
        //         },
        //         {
        //             planId: '2',
        //             roomNo: '123',
        //             code: 'cd',
        //             template: '[plan]',
        //             newestTime: '2017-12-22',
        //             lastPullTime: 12345678900,
        //             createTime: 12345678900
        //         }
        //     ]
        // )
    }

    create(roomPlan: RoomPlan): Observable<any> {
        return this.http.post(`/room-plans`, roomPlan)
    }

    update(roomPlan: RoomPlan): Observable<any> {
        return this.http.put(`/room-plans/${roomPlan.planId}`, roomPlan)
    }

    delete(planId: string): Observable<any> {
        return this.http.delete(`/room-plans/${planId}`)
    }
}