import { Injectable } from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {AuthPermissionCategory} from "./permission";
import {Observable} from "rxjs/Observable";

@Injectable()
export class PermissionService {

    // private authPermissionCategory: BehaviorSubject<AuthPermissionCategory[]>;

    constructor(
        private http: HttpClient
    ) {
        // this.authPermissionCategory = new BehaviorSubject<AuthPermissionCategory[]>([]);
    }

    getPermissionCategories(): Observable<any> {
        return this.http.get(`/permission-categories`)

        // return Observable.of(
        //     [
        //         {
        //             name: '游客',
        //             remark: '游客权限',
        //             category: 'visitor',
        //             permissions: [
        //                 {
        //                     permissionId: 1,
        //                     name: '编辑',
        //                     operation: 'visitor:edit',
        //                     remark: '游客编辑'
        //                 },
        //                 {
        //                     permissionId: 2,
        //                     name: '查看',
        //                     operation: 'visitor:view',
        //                     remark: '游客查看'
        //                 }
        //             ]
        //         }
        //     ]
        // )
    }
}