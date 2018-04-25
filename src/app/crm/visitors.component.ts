import { Component, OnInit } from "@angular/core";
import {Page, PageDataSource} from "../shared/material-utils";
import {Visitor} from "./visitor";
import {VisitorService} from "./visitor.service";
import {HttpParams} from "@angular/common/http";
import {ModalService} from "../../rui/packages/modal/modal.service";
import {VisitorInfoComponent} from "./visitor-info.component";

@Component({
    selector: 'visitors',
    templateUrl: 'visitors.component.html'
})
export class VisitorsComponent implements OnInit {
    displayedColumns = ['visitorNo', 'nickname', 'referrer', 'lastOperationTime', 'createTime', 'operation'];
    dataSource: PageDataSource<Visitor>;
    pageSize: number = 10;
    pageIndex: number = 0;

    constructor(
        private visitorService: VisitorService,
        private modalService: ModalService
    ) {
        this.dataSource = new PageDataSource<Visitor>();
    }
    ngOnInit() {
        this.load();
    }
    onPageChange(page: any) {
        this.pageIndex = page.pageIndex;
        this.load();
    }

    load() {
        let params = new HttpParams()
            .set("page", this.pageIndex.toString())
            .set("size", this.pageSize.toString());
        this.visitorService.getPage({params}).subscribe((page : any) => {
            this.dataSource.data = page as Page<Visitor>;
        });
    }

    edit(row: Visitor) {
        //TODO 宽度设成380px
        this.modalService.open(VisitorInfoComponent, {
            data: row
        })
    }
}
