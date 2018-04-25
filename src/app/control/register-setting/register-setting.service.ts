import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs/Observable";

@Injectable()
export class RegisterSettingService {

    constructor(
        private http: HttpClient
    ) {

    }

    get(): Observable<any> {
        return this.http.get('/corp/register-opts')
    }

    patch(params: any): Observable<any> {
        return this.http.patch('/corp/register-opts', params)
    }

    getMoney(): Observable<any> {
        return this.http.get('/corp/drawmoney-opts')
    }

    patchMoney(params: any): Observable<any> {
        return this.http.patch('/corp/drawmoney-opts', params)
    }

    getChat(): Observable<any> {
        return this.http.get(`/corp/chat-opts`)
    }
    patchChat(params: any): Observable<any> {
        return this.http.patch(`/corp/chat-opts`, params)
    }
}