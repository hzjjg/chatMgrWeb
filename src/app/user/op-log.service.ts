
import {Injectable} from "@angular/core";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs/Observable";

@Injectable()
export class OpLogService {

    private url = '/op-logs';
    constructor(
        private httpClient: HttpClient
    ) {

    }

    getLogs(options?: {
        params?: HttpParams
    }):Observable<any> {
        return this.httpClient.get(this.url, options);
    }
}