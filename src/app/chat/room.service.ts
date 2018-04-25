
import {EntityService} from "../shared/entity.service";
import {Extension, Room} from "./room";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs/Observable";
import {Functional} from "./functional";

@Injectable()
export class RoomService {

    private entityUrl = "/rooms"
    constructor(
        private httpClient: HttpClient
    ) {
    }

    getEntities(options?: {
        params?: HttpParams,
    }): Observable<any> {
        return this.httpClient.get(`${this.entityUrl}`, options);
    }

    getEntity(roomNo: string): Observable<any> {
        return this.httpClient.get(`${this.entityUrl}/${roomNo}`)
    }

    update(roomNo:string, entity: Room): Observable<any> {
        return this.httpClient.put(`${this.entityUrl}/${entity.roomNo}`, entity);
    }

    fetchFunctional(roomNo: string): Observable<any> {
        return this.httpClient.get(`${this.entityUrl}/${roomNo}/functional`);
    }

    updateFunctional(roomNo: string, functional: Functional) {
        return this.httpClient.put(`${this.entityUrl}/${roomNo}/functional`, functional);
    }

    getRoomUsers(roomNo: string): Observable<any> {
        return this.httpClient.get(`${this.entityUrl}/${roomNo}/users`);
    }
    removeRoomUser(roomNo: string, userId: number) : Observable<any> {
        return this.httpClient.delete(`${this.entityUrl}/${roomNo}/users/${userId}`);
    }

    getExtension(roomNo: string) {
        // return this.httpClient.get(`${this.entityUrl}/${roomNo}/platform`);

        return Observable.of(
            [{
                name: '平台介绍',
                text: '这是平台介绍'
            }]
        ).delay(100)
    }

    updateExtension(roomNo: string, extensions: Extension[]) {
        return this.httpClient.put(`${this.entityUrl}/${roomNo}/platform`, extensions);
    }
}