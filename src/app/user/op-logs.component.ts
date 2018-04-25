import { Component, OnInit } from "@angular/core";
import { PageDataSource, SimpleDataSource } from "../shared/material-utils";
import { OpLog } from "./op-log";
import { OpLogService } from "./op-log.service";
import { ToastService } from "../rui";
import { HttpParams } from "@angular/common/http";

@Component({
    selector: 'op-logs',
    templateUrl: 'op-logs.component.html'
})
export class OpLogsComponent implements OnInit {
    displayedColumns = ['ip', 'username', 'op', 'time'];
    // displayedColumns: ['ip', 'op', 'time'];
    // dataSource: OpLogDataSource;

    dataSource: PageDataSource<OpLog>;
    pageSize: number = 10;
    pageIndex: number = 0;
    constructor(
        private opLogService: OpLogService,
        private toastService: ToastService
    ) {
        this.dataSource = new PageDataSource<OpLog>();
    }
    ngOnInit() {
        this.load();
    }
    load() {
        let params = new HttpParams()
            .set("page", this.pageIndex.toString())
            .set("size", this.pageSize.toString());
        this.opLogService.getLogs({ params }).subscribe((page: any) => {
            // console.log(page);
            this.dataSource.data = page;
        });
    }
    onPageChange(page: any) {
        this.pageIndex = page.pageIndex;
        this.load();
    }
}

// export class OpLogDataSource extends SimpleDataSource<OpLog> {
//
//     map(data: OpLog[], filter: any): OpLog[] {
//         return data.filter(value => {
//             return !filter || value.username == filter;
//         })
//     }
// }