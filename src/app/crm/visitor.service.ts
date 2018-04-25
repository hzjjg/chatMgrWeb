
import {Visitor} from "./visitor";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs/Observable";
import {Page} from "../shared/material-utils";

@Injectable()
export class VisitorService  {

    private entityUrl = '/visitors';
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
        //     {"rows":[{"userId":24,"userType":"Visitor","nickname":"游客9530","visitorId":41,"visitorNo":"1508341601132","createTime":1508341601222},{"userId":25,"userType":"Visitor","nickname":"游客2023","visitorId":42,"visitorNo":"1508342111374","createTime":1508342111740},{"userId":26,"userType":"Visitor","nickname":"游客8934","visitorId":43,"visitorNo":"1508342191709","createTime":1508342191821},{"userId":27,"userType":"Visitor","nickname":"游客9116","visitorId":44,"visitorNo":"1508342237809","createTime":1508342237905},{"userId":28,"userType":"Visitor","nickname":"游客8505","visitorId":45,"visitorNo":"1508342290193","createTime":1508342290297},{"userId":29,"userType":"Visitor","nickname":"游客9165","visitorId":46,"visitorNo":"1508342389606","createTime":1508342389738},{"userId":30,"userType":"Visitor","nickname":"游客9793","visitorId":47,"visitorNo":"1508342482638","createTime":1508342482954},{"userId":31,"userType":"Visitor","nickname":"游客3975","visitorId":48,"visitorNo":"1508342528107","createTime":1508342528221},{"userId":32,"userType":"Visitor","nickname":"游客4494","visitorId":49,"visitorNo":"1508342555707","createTime":1508342555813},{"userId":33,"userType":"Visitor","nickname":"游客4376","visitorId":50,"visitorNo":"1508342753017","createTime":1508342753166}],"total":591}
        // ).delay(1000)
    }

    get(entityId: number): Observable<any> {
        return this.httpClient.get(`${this.entityUrl}/${entityId}`)
    }
}