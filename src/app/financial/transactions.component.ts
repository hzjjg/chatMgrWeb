import {Component, DoCheck, OnInit} from "@angular/core";
import {TransactionService} from "./transaction.service";
import {PageDataSource} from "../shared/material-utils";
import {HttpParams} from "@angular/common/http";
import {Transaction, TransactionType, TransferType} from "../crm/transfer";
import {ModalRef} from "../../rui/packages/modal/modal-ref";
import {ModalService} from "../../rui/packages/modal/modal.service";
import {LookInfoComponent} from "./look-Info/look-info.component";
import {LookInfoService} from "./look-Info/look-info.service";
import {DatePipe} from "@angular/common";
import {RedPacketComponent} from "./red-packet/red-packet.component";

@Component({
    selector: 'transactions',
    templateUrl: 'transactions.component.html',
    styleUrls: ['./transactions.component.scss'],
    host: {
        'class': 'container-fluid mx-3 my-3'
    },
    providers: [DatePipe]
})
export class TransactionsComponent implements OnInit {

    // 'transactionNo',  'operation'
    displayedColumns = ['relationUsername', 'type', 'transferType', 'money', 'account','statement', 'time',];

    dataSource: PageDataSource<Transaction>;
    pageSize: number = 25;
    pageIndex: number = 0;

    likeRelationUsername: string;

    filterTypes: any[];
    filterUserTypes: any[];

    transactionType: TransactionType;
    type: TransferType;
    selected: string;
    usernameSelected: string;

    startDate: Date;
    endDate: Date;

    constructor(
        private transactionService: TransactionService,
        private modalService: ModalService,
        private lookInfoService: LookInfoService,
        private datePipe: DatePipe
    ) {
        this.dataSource = new PageDataSource<Transaction>();
    }
    ngOnInit() {
        this.load();
        this.transactionType = new TransactionType();

        this.type = new TransferType();
        this.filterTypes = [
            {
                type: this.transactionType.ConversionMoney,
                name: '提现'
            },
            {
                type: this.transactionType.RedPacket,
                name: '红包'
            },
            {
                type: this.transactionType.StaffAdjust,
                name: '员工调整'
            }
        ];
        this.filterUserTypes = [
            {
                type: 'Customer',
                name: '客户'
            },
            {
                type: 'Staff',
                name: '客服'
            },
        ]
    }

    onPageChange(page: any) {
        this.pageIndex = page.pageIndex;
        this.load();
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
            .set("page", this.pageIndex.toString())
            .set("size", this.pageSize.toString());
        if(this.likeRelationUsername) {
            params = params.set("likeRelationUsername", this.likeRelationUsername);
        }
        if(this.selected) {
            params = params.set("type", this.selected);
        }
        if(this.usernameSelected) {
            params = params.set("userType", this.usernameSelected);
        }
        if(this.startDate) {
            params = params.set("startTime", this.startDate.getTime().toString());
        }
        if(this.endDate) {
            params = params.set("endTime", this.endDate.getTime().toString());
        }
        this.transactionService.getPage({params}).subscribe((page: any) => {
            this.dataSource.data = page;
        });
    }
    searchInput() {
        this.pageIndex = 0;
        this.load();
    }
    selectStatus(type: string) {
        if(this.selected == type) {
            return;
        }
        this.selected = type;
        this.pageIndex = 0;
        this.load();
    }
    selectUserType(type: string) {
        if(this.usernameSelected == type) {
            return;
        }
        this.usernameSelected = type;
        this.pageIndex = 0;
        this.load();
    }

    formatTransferType(type: string) {
        switch (type){
            case this.type.TO: return '转入';
            case this.type.OUT: return '转出';
        }
    }
    formatType(type: string) {
        switch (type){
            case this.transactionType.ConversionMoney: return '提现';
            case this.transactionType.RedPacket: return '红包';
            case this.transactionType.StaffAdjust: return '员工调整';
        }
    }

    search(e: any) {
        let key = e.keyCode || e.which;
        if(key == 13) {
            this.searchInput();
        }
    }

    lookStaffInfo(row: any) {
        this.lookInfoService.get(row.staffId)
    }

    lookRedPacket(row: any) {
        const ref: ModalRef = this.modalService.open(RedPacketComponent, {
            data: row.packetId
        })
    }
}