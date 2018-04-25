import {DataSource} from "@angular/cdk/collections";
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {Observable} from "rxjs/Observable";

// https://material.angular.io/components/table/examples
export abstract class SimpleDataSource<T> extends DataSource<T> {
    _dataChange = new BehaviorSubject([]); //数据临时加载
    _filterChange = new BehaviorSubject(null);

    get data(): T[] { return this._dataChange.value; }
    set data(data: T[]) {
        this._dataChange.next(data); }
    get filter(): any { return this._filterChange.value; }
    set filter(filter: any) { this._filterChange.next(filter)};
    connect() : Observable<T[]>{
        const displayDataChanges = [
            this._dataChange,
            this._filterChange
        ];

        return Observable.merge(...displayDataChanges).map(() => {
            return this.map(this.data, this.filter);
        })
    }
    abstract map(data: T[], filter: any): T[];
    disconnect() {

    }
}

export class Page<T> {
    rows: T[];
    total: number;
    adoptedMoney?: number;
    rejectedMoney?: number;
    waitingMoney?: number;
    toMoney?: number;
    outMoney?: number;

    constructor(rows?:T[], total?: number) {
        this.rows = rows || [];
        this.total = total || 0;
    }
}
export class PageDataSource<T> extends DataSource<T> {
    _dataChange = new BehaviorSubject(new Page<T>()); //数据临时加载

    get data(): Page<T> { return this._dataChange.value; }
    set data(data: Page<T>) {
        this._dataChange.next(data); }
    get total() {
        return this.data.total;
    }
    connect() : Observable<T[]>{
        const displayDataChanges = [
            this._dataChange
        ];

        return Observable.merge(...displayDataChanges).map(() => {
            return this.data.rows;
        })
    }
    disconnect() {

    }
}