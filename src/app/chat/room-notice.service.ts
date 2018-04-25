import {Injectable} from "@angular/core";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs/Observable";

@Injectable()
export class RoomNoticeService {

    constructor(
        private http: HttpClient
    ) {

    }

    get(roomNo: string): Observable<any> {
        const params = new HttpParams()
            .set('roomNo', roomNo);
        return this.http.get(`/room-notice/proxy/qq-qrcode`, {params: params});

        // return Observable.of(
        //     {
        //         path: '/images/avatar/1.jpg',
        //         time: 19283733649
        //     }
        // ).delay(1000);
    }

    getQQ(roomNo: string): Observable<any> {
        const params = new HttpParams()
            .set('roomNo', roomNo);
        return this.http.get(`/room-notice/proxy/qq`, {params: params})

        // return Observable.of(
        //     {
        //         account: '305948226',
        //         nick: '你我·她'
        //     }
        // ).delay(1000);
    }

    deleteQQ(roomNo: string): Observable<any> {
        const params = new HttpParams()
            .set('roomNo', roomNo);
        return this.http.delete(`/room-notice/proxy/qq`, {params: params})
    }
}