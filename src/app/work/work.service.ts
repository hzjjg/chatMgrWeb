import { Injectable } from "@angular/core";
import {HttpClient, HttpParams} from "@angular/common/http";
import {ConversionMoneyWork, Work} from "./work";
import {Observable} from "rxjs/Observable";
import {BehaviorSubject} from "rxjs/BehaviorSubject";

@Injectable()
export class WorkService {

    constructor(
        private http: HttpClient
    ) {

    }

    getConversionWorks(options?: {
        params?: HttpParams
    }) {
        return this.http.get(`/conversion-works`, options)
    }

    putWork(workId :string, params: any) {
        // let params = {
        //     status: row.status,
        //     reason: row.reason
        // };
        // let params = new HttpParams()
        //     .set('status', row.status)
        //     .set('reason', row.reason);
        return this.http.put(`/conversion-works/${workId}`, params);
    }
}