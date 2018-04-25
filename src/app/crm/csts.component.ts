import { Component, OnInit, Renderer2 } from "@angular/core";
import { CstService } from "./cst.service";
import { PageDataSource, SimpleDataSource } from "../shared/material-utils";
import {Cst, UserType} from "./cst";
import { HttpParams } from "@angular/common/http";
import { ModalRef } from "../../rui/packages/modal/modal-ref";
import { ModalService } from "../../rui/packages/modal/modal.service";
import { CstInfoComponent } from "./cst-info.component";
import { TransferComponent } from "./transfer.component";
import { TransferRecordComponent } from "./transfer-record.component";
import { ResetCstPasswordComponent } from "./reset-cst-password.component";
import { GagInfoComponent } from "../control/gag-info/gag-info.component";
import { GagCreateComponent } from "./gag-create/gag-create.component";
import { GagAlertComponent } from "./gag-alert/gag-alert.component";
import { MessageBoxService } from "../../rui/packages/message-box/message-box.service";
import { ToastService } from "../../rui/packages/toast/toast.service";
import {PopularizeCodeInfoComponent} from "./popularize-code-info/popularize-code-info.component";

@Component({
    selector: 'customers',
    templateUrl: 'csts.component.html',
    styleUrls: ['csts.component.scss']
})
export class CstsComponent implements OnInit {
    displayedColumns = ['username', 'nickname', 'balance', 'registerHost', 'popularizeCode', 'referrer', 'createTime', 'operation'];
    //, 'phone'
    dataSource: PageDataSource<Cst>;
    pageSize: number = 10;
    pageIndex: number = 0;

    likeUsername: string;
    likeNickname: string;
    userStatus = UserType;
    status: UserType;
    filterStatus: any[];

    cstModalRef: ModalRef;

    showSelect: boolean = false;

    sort: string = 'desc';
    loading: boolean = false;

    // get likeUsername() {
    //     return this._likeUsername;
    // }
    //
    // set likeUsername(username: string) {
    //     this._likeUsername = username;
    //     this.load();
    // }


    constructor(
        private cstService: CstService,
        private modalService: ModalService,
        private renderer: Renderer2,
        private messageBoxService: MessageBoxService,
        private toastService: ToastService
    ) {
        this.dataSource = new PageDataSource<Cst>();
    }
    sortCreateTime() {
        if(this.loading) {
            return;
        }
        if(this.sort === 'asc') {
            this.sort = 'desc';
        } else if(this.sort === 'desc') {
            this.sort = 'asc';
        }
        this.load();
    }
    ngOnInit() {
        this.status = this.userStatus.Enable;
        this.filterStatus = [
            {
                status: this.userStatus.Enable,
                name: '有效'
            },
            {
                status: this.userStatus.Disable,
                name: '禁用'
            }
        ];
        this.load();
        this.renderer.listen('window', 'click', (event: any) => {
            if (this.showSelect) {
                this.showSelect = !this.showSelect;
                event.stopPropagation();
            }
        })
    }
    selectStatus(status: UserType) {
        if(this.status === status) {
            return;
        }
        this.status = status;
        this.pageIndex = 0;
        this.load();
    }

    toggleSelect(event: any) {
        this.showSelect = !this.showSelect;
        event.stopPropagation();
    }
    onPageChange(page: any) {
        this.pageIndex = page.pageIndex;
        this.load();
    }

    load() {
        this.loading = true;
        let params = new HttpParams()
            .set("page", this.pageIndex.toString())
            .set("size", this.pageSize.toString())
            .set('status', this.status.toString())
            .set('sort', 'createTime,' + this.sort);
        if (this.likeUsername) {
            params = params.set("likeUsername", this.likeUsername);
        }
        if (this.likeNickname) {
            params = params.set("likeNickname", this.likeNickname);
        }
        this.cstService.getPage({ params }).subscribe((page: any) => {
            this.dataSource.data = page;
        }, () => {

        }, () => {
            this.loading = false;
        });
    }
    searchInput() {
        this.pageIndex = 0;
        this.load();
    }
    search(e: any) {
        let key = e.keyCode || e.which;
        if (key == 13) {
            this.searchInput();
        }
    }

    edit(row: Cst) {
        //TODO 宽度设成380px
        this.cstModalRef = this.modalService.open(CstInfoComponent, {
            data: Object.assign({}, row)
        })
        this.cstModalRef.didDisappear().subscribe((data: any) => {
            if (data) {
                this.load();
            }
        })
    }

    disabledCst(row: Cst) {
        // console.log(row, "cst");
        this.messageBoxService.confirm(`确认是否禁用 "${row.nickname}"`).handle.then(() => {
            this.cstService.delete(row.cstId).subscribe(() => {
                this.load();
                this.toastService.show({
                    message: '删除成功',
                    type: 'success',
                    position: 'top'
                })
            }, response => {
                this.toastService.error(response.error.msg);
            }, () => {
                //加载关闭
            })
        });
    }

    transfer(row: Cst) {
        const ref: ModalRef = this.modalService.open(TransferComponent, {
            data: row
        });
        ref.didDisappear().subscribe((data: any) => {
            if (data) {
                this.load();
            }
        })
    }

    resetPassword(row: Cst) {
        const ref = this.modalService.open(ResetCstPasswordComponent, {
            data: row
        })
    }

    transferRecord(row: Cst) {
        const ref: ModalRef = this.modalService.open(TransferRecordComponent, {
            data: row.userId
        })
    }
    toggleGossip(row: Cst) {
        const ref: ModalRef = this.modalService.open(GagCreateComponent, {
            data: row
        });
        ref.didDisappear().subscribe((data) => {
            if (data) {
                this.load();
            }
        })
    }

    openGagAlert(row: any) {
        if (row.gags.length == 0) {
            return;
        }
        const ref: ModalRef = this.modalService.open(GagAlertComponent, {
            data: row.gags
        })
    }

    openPopularize() {
        const ref: ModalRef = this.modalService.open(PopularizeCodeInfoComponent)
    }
}
