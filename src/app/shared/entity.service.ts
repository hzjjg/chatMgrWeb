import {Observable} from "rxjs/Observable";
import {HttpClient, HttpParams} from "@angular/common/http";

export class EntityService<E> {
    constructor(
        private entityUrl: String,
        private idName: string,
        private http: HttpClient
    ) {

    }
    getEntities(options?: {
        // headers?: HttpHeaders;
        // observe?: 'body';
        params?: HttpParams;
        // reportProgress?: boolean;
        // responseType?: 'json';
        // withCredentials?: boolean;
    }): Observable<any> {
        return this.http.get(`${this.entityUrl}`, options);
    }

    getEntity(entityId: number): Observable<any> {
        return this.http.get(`${this.entityUrl}/${entityId}`)
    }

    create(entity: E): Observable<any> {
        return this.http.post(`${this.entityUrl}`, entity);
    }
    update(entity: E): Observable<any> {
        return this.http.put(`${this.entityUrl}/${entity[this.idName]}`, entity);
    }

    delete(entityId: number): Observable<any> {
        return this.http.delete(`${this.entityUrl}/${entityId}`);
    }

    getPermissions(): Observable<any> {

        return Observable.of(
            [
                {
                    name: '游客',
                    category: ''
                }
            ]
        )
    }
}