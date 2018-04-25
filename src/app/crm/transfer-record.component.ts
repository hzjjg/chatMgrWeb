import {Component, Inject} from "@angular/core";
import {ModalRef} from "../../rui/packages/modal/modal-ref";
import {Transaction, TransactionType, TransferType} from "./transfer";
import {PageDataSource} from "../shared/material-utils";
import {HttpParams} from "@angular/common/http";
import {TransferService} from "./transfer.service";
import {MODAL_DATA, ModalService} from "../../rui/packages/modal/modal.service";
import {LookInfoComponent} from "../financial/look-Info/look-info.component";
import {LookInfoService} from "../financial/look-Info/look-info.service";

@Component({
    selector: 'transfer-record',
    templateUrl: 'transfer-record.component.html'
})

export class TransferRecordComponent {

    displayedColumns = ['transferType', 'type', 'money', 'statement'];
    dataSource: PageDataSource<Transaction>;

    pageSize: number = 10;
    pageIndex: number = 0;
    likeRelationUsername: string;
    id: string;

    transactionType: TransactionType;
    type: TransferType;

    constructor(
        @Inject(MODAL_DATA) id: string,
        public modalRef: ModalRef,
        private transferService: TransferService,
        private modalService: ModalService,
        private lookInfoService: LookInfoService
    ) {
        this.id = id;
        this.dataSource = new PageDataSource<Transaction>();
    }

    ngOnInit() {
        this.load();
        this.transactionType = new TransactionType();
        this.type = new TransferType();
    }

    onPageChange(page: any) {
        this.pageIndex = page.pageIndex;
        this.load();
    }
    load() {
        let params = new HttpParams()
            .set("page", this.pageIndex.toString())
            .set("size", this.pageSize.toString())
            .set('userId', this.id);
        this.transferService.get({params}).subscribe((page: any) => {
            this.dataSource.data = page;
        });
    }

    formatTransferType(type: string) {
        switch (type){
            case this.type.TO: return '转入';
            case this.type.OUT: return '转出';
        }
    }
    formatType(type: string) {
        switch (type){
            case this.transactionType.RedPacket: return '红包';
            case this.transactionType.StaffAdjust: return '员工调整';
            case this.transactionType.ConversionMoney: return '提现';
        }
    }

    lookStaffInfo(row: any) {
        this.lookInfoService.get(row.staffId)
    }
    viewAccount() {

    }
}