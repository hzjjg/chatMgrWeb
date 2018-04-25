import { Injectable } from "@angular/core";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs/Observable";
import {Contact} from "./contact";

@Injectable()
export class ContactService {

    constructor(
        private http: HttpClient
    ) {

    }

    getContact(
        roomNo: string
    ):Observable<any> {
        let params = new HttpParams()
            .set('roomNo', roomNo);
        return this.http.get(`/room-contacts`, {
            params: params
        })

        // return Observable.of(
        //     [
        //         {
        //             contactId: '1',
        //             roomNo: '2',
        //             type: 'QQ',
        //             name: '在线客服1',
        //             url: 'http://www.baidu.com'
        //         },
        //         {
        //             contactId: '2',
        //             roomNo: '2',
        //             type: 'QQ',
        //             name: '在线客服2',
        //             url: 'http://www.xinlang.com'
        //         }
        //     ]
        // )
    }

    createContact(contact: Contact):Observable<any> {
        return this.http.post(`/room-contacts`, contact);
    }

    updateContact(contact: Contact):Observable<any> {
        return this.http.put(`/room-contacts/${contact.contactId}`, contact);
    }

    delete(contact: Contact):Observable<any> {
        return this.http.delete(`/room-contacts/${contact.contactId}`);
    }
}