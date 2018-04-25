import { Injectable } from "@angular/core";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs/Observable";
import {Cst} from "./cst";
import {Transaction} from "./transfer";

@Injectable()
export class TransferService {

    constructor(
        private http: HttpClient
    ) {

    }

    get(options?: {
        params?: HttpParams;
    }):Observable<any> {
        return this.http.get(`/transactions`, options)

        // return Observable.of(
        //     {
        //         rows: [
        //             {
        //                 type: 'RedPacket',
        //                 transferType: 'TO',
        //                 customerId: 12,
        //                 customerUsername: 'zhang',
        //                 money: 321,
        //                 statement: '123',
        //                 time: 12331232323232323
        //             },
        //             {
        //                 type: 'RedPacket',
        //                 transferType: 'TO',
        //                 customerId: 12,
        //                 customerUsername: 'zhang',
        //                 money: 321,
        //                 statement: '123',
        //                 time: 12331232323232323
        //             }
        //         ],
        //         total: 2
        //     }
        // )
    }

    post(customerId: any, transaction: Transaction):Observable<any> {
        return this.http.post(`/customers/${customerId}/transaction`, transaction)
    }
}