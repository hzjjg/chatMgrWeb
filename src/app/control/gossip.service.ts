import { Injectable } from "@angular/core";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs/Observable";
import {Gossip} from "./gossip";

@Injectable()
export class GossipService {

    constructor(
        private http: HttpClient
    ) {

    }

    getGags(options?: {
        params?: HttpParams 
    }): Observable<any> {
        return this.http.get(`/security-gags`, options);

        // return Observable.of(
        //     {
        //         rows: [
        //             {
        //                 gagId: 1,
        //                 userId: 1,
        //                 userType: 'Customer',
        //                 relationId: 1,
        //                 username: 'string',
        //                 reason: 'string',
        //                 expireTime: 12344444567000,
        //                 createTime: 12444444567000
        //             },
        //             {
        //                 gagId: 2,
        //                 userId: 2,
        //                 userType: 'Customer',
        //                 relationId: 2,
        //                 username: 'string',
        //                 reason: 'string',
        //                 expireTime: 12344444567000,
        //                 createTime: 12444444567000
        //             }
        //         ],
        //         total:2
        //     }
        // ).delay(1000);
    }

    create(gag: Gossip): Observable<any> {
        return this.http.post(`/security-gags`, gag);
    }

    getGag(gagId: any): Observable<any> {
        return this.http.get(`/security-gags/${gagId}`);

        // return Observable.of(
        //     {
        //         gagId: 1,
        //         userId: 1,
        //         userType: 'Customer',
        //         relationId: 1,
        //         username: 'string',
        //         reason: 'string',
        //         expireTime: 12344444567000,
        //         createTime: 12444444567000
        //     }
        // )
    }

    update(gag: Gossip): Observable<any> {
        return this.http.put(`/security-gags/${gag.gagId}`, gag);
    }

    delete(gagId: any): Observable<any> {
        return this.http.delete(`/security-gags/${gagId}`);
    }
}