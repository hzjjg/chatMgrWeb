import { Component, OnInit } from "@angular/core";
import {HttpParams} from "@angular/common/http";
import {ConversionMoneyWork, Work, WorkReviewStatus} from "./work";
import {WorkService} from "./work.service";
import {PageDataSource} from "../shared/material-utils";
import {ModalService} from "../../rui/packages/modal/modal.service";
import {ToDoModalComponent} from "./to-do-modal.component";
import {ModalRef} from "../../rui/packages/modal/modal-ref";
import {LookInfoComponent} from "../financial/look-Info/look-info.component";
import {LookInfoService} from "../financial/look-Info/look-info.service";

@Component({
    selector: 'to-do-list',
    templateUrl: 'to-do-list.component.html',
    styleUrls: ['./to-do-list.component.scss'],
    host: {
        "class": "container-fluid mx-3 my-3"
    }
})
export class ToDoListComponent implements OnInit {
    displayedColumns = ['username', 'type', 'money','account', 'status', 'reviewTime', 'remark', 'createTime', 'operation'];
    dataSource: PageDataSource<ConversionMoneyWork>;

    workReviewStatus = WorkReviewStatus;

    pageSize: number = 10;
    pageIndex: number = 0;
    selected: string;

    filterStatus: any[];

    startDate: Date;
    endDate: Date;

    constructor(
        private workService: WorkService,
        private modalService: ModalService,
        private lookInfoService: LookInfoService
    ) {
        this.dataSource = new PageDataSource<ConversionMoneyWork>();
    }

    watchDate() {
        if(this.endDate && (this.startDate > this.endDate)) {
            this.endDate = null;
        }
        if(this.startDate || this.endDate) {
            this.pageIndex = 0;
            this.load();
        }
    }
    deleteStartDate(e: any) {
        let key = e.keyCode || e.which;
        if(key == 8) {
            this.startDate = null;
            this.pageIndex = 0;
            this.load();
        }
    }
    deleteEndDate(e: any) {
        let key = e.keyCode || e.which;
        if(key == 8) {
            this.endDate = null;
            this.pageIndex = 0;
            this.load();
        }
    }

    load() {
        let params = new HttpParams()
            .set('page', this.pageIndex.toString())
            .set('size', this.pageSize.toString());
        if(this.selected) {
            params = params.set("status", this.selected);
        }
        if(this.startDate) {
            params = params.set("startTime", this.startDate.getTime().toString());
        }
        if(this.endDate) {
            params = params.set("endTime", this.endDate.getTime().toString());
        }
        this.workService.getConversionWorks({params}).subscribe((data: any) => {
            this.dataSource.data = data;
        })
    }

    ngOnInit() {
        this.load();
        this.filterStatus = [
            {
                status: WorkReviewStatus.ADOPTED,
                name: '允许'
            },
            {
                status: WorkReviewStatus.REJECTED,
                name: '拒绝'
            },
            {
                status: WorkReviewStatus.WAITING,
                name: '待处理'
            }
        ]
    }

    refresh() {
        this.load();
    }

    lookStaffInfo(row: any) {
        this.lookInfoService.get(row.staffId)
    }

    selectStatus(status: string) {
        if(this.selected == status) {
            return;
        }
        this.selected = status;
        this.pageIndex = 0;
        this.load();
    }

    onPageChange(page: any) {
        this.pageIndex = page.pageIndex;
        this.load();
    }

    lookRow(row: ConversionMoneyWork) {
        const ref: ModalRef = this.modalService.open(ToDoModalComponent, {
            data: {
                // type: 'look',
                row: Object.assign({}, row)
            }
        });
    }
    openModal(row: ConversionMoneyWork) {
        const ref: ModalRef = this.modalService.open(ToDoModalComponent, {
            data: {
                // type: type,
                row: Object.assign({}, row)
            }
        });
        ref.didDisappear().subscribe(row => {
            if (row) {
                this.load();
            }
        })
    }

    editRow(row: ConversionMoneyWork) {
        // , type: WorkReviewStatus
        const ref: ModalRef = this.modalService.open(ToDoModalComponent, {
            data: {
                // type: type,
                row: Object.assign({}, row)
            }
        });
        ref.didDisappear().subscribe(row => {
            if (row) {
                this.load();
            }
        })
    }

    // allowRow(row: ConversionMoneyWork) {
    //     // this.editRow(row, WorkReviewStatus.ADOPTED);
    // }
    // refuseRow(row: ConversionMoneyWork) {
    //     // this.editRow(row, WorkReviewStatus.REJECTED);
    // }
}