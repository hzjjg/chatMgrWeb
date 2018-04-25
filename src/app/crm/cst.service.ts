

import { Injectable } from "@angular/core";
import { EntityService } from "../shared/entity.service";
import { Cst, GagInfo } from "./cst";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs/Observable";

@Injectable()
export class CstService {

    private entityUrl = '/customers';
    constructor(
        private httpClient: HttpClient
    ) {
    }

    getPage(options?: {
        // headers?: HttpHeaders;
        // observe?: 'body';
        params?: HttpParams;
        // reportProgress?: boolean;
        // responseType?: 'json';
        // withCredentials?: boolean;
    }): Observable<any> {
        return this.httpClient.get(`${this.entityUrl}`, options);

        // return Observable.of(
        //     {"rows":[{"userId":331,"userType":"Customer","nickname":"要做@","avatar":"/images/avatar/0.jpg","personalSignature":"小张的签名","cstId":8,"username":"test","balance":9134.52,"lastOperationTime":1511267708145,"createTime":1509185141886},{"userId":339,"userType":"Customer","nickname":"稻感","avatar":"/images/avatar/4.jpg","personalSignature":"移民局办事","cstId":9,"username":"songzy","balance":9995.94,"lastOperationTime":1511100084354,"createTime":1509194478434},{"userId":341,"userType":"Customer","nickname":"用户6802","avatar":"/images/avatar/11.jpg","cstId":10,"username":"hzjjg","balance":9947.58,"lastOperationTime":1511277462898,"createTime":1509195929696},{"userId":351,"userType":"Customer","nickname":"客服","avatar":"/images/avatar/18.jpg","personalSignature":"我是假客服","cstId":11,"username":"111","balance":9034.29,"lastOperationTime":1511105143979,"createTime":1509205574482},{"userId":353,"userType":"Customer","nickname":"用户6010","cstId":12,"username":"222","balance":100000.0,"createTime":1509206091444},{"userId":372,"userType":"Customer","nickname":"小明同学","personalSignature":"小明同学","cstId":13,"username":"test2","balance":0.0,"createTime":1509216177472},{"userId":382,"userType":"Customer","nickname":"bug","avatar":"/images/avatar/17.jpg","personalSignature":"博出精彩，乐在其中","cstId":14,"username":"bolecheng","balance":515.35,"createTime":1509245754442},{"userId":405,"userType":"Customer","nickname":"用户1274","avatar":"/images/avatar/0.jpg","cstId":15,"username":"qwerty1","balance":0.0,"createTime":1509264170354},{"userId":504,"userType":"Customer","nickname":"用户7598","avatar":"/images/avatar/0.jpg","cstId":16,"username":"12345","balance":0.0,"createTime":1509466240422},{"userId":506,"userType":"Customer","nickname":"用户8958","avatar":"/images/avatar/0.jpg","cstId":17,"username":"123456","balance":0.0,"createTime":1509466277559}],"total":14}
        // ).delay(1000)
    }

    get(entityId: number): Observable<any> {
        return this.httpClient.get(`${this.entityUrl}/${entityId}`)
    }

    resetPassword(cstId: any, password: string): Observable<any> {
        return this.httpClient.put(`/customers/${cstId}/pwd`, {
            pwd: password
        })
    }

    putGag(customerId: any, gagInfo: GagInfo) {
        return this.httpClient.put(`/customers/${customerId}/gag`, {
            expireTime: gagInfo.expireTime,
            reason: gagInfo.reason
        })
    }

    delete(cstId: any): Observable<any> {
        return this.httpClient.delete(`/customers/${cstId}`)
    }

    updateInfo(cstId: any, params: { name?: string; qq?: number; weChat?: string; phone?: number }): Observable<any> {
        return this.httpClient.put(`/customers/${cstId}`, params)
    }
}