import { Component } from "@angular/core";
import {PageDataSource, SimpleDataSource} from "../shared/material-utils";
import {GossipService} from "./gossip.service";
import {HttpParams} from "@angular/common/http";
import {ActivatedRoute} from "@angular/router";
import {Gossip} from "./gossip";
import {DatePipe} from "@angular/common";
import {ModalRef} from "../../rui/packages/modal/modal-ref";
import {ModalService} from "../../rui/packages/modal/modal.service";
import {GagInfoComponent} from "./gag-info/gag-info.component";
import {MessageBoxService} from "../../rui/packages/message-box/message-box.service";
import {ToastService} from "../../rui/packages/toast/toast.service";

@Component({
    selector: 'gossip',
    templateUrl: 'gossip.component.html',
    styleUrls: ['gossip.component.scss'],
    providers: [DatePipe]
})

export class GossipComponent {
    displayedColumns = ['username', 'userType', 'expireTime', 'reason', 'createTime', 'operation'];
    dataSource: PageDataSource<Gossip>;
    pageSize: number = 10;
    pageIndex: number = 0;

    likeUsername: string;

    constructor(
        private gossipService: GossipService,
        private datePipe: DatePipe,
        private modalService: ModalService,
        private messageBoxService: MessageBoxService,
        private toastService: ToastService,
        // private modalRef: ModalRef
    ) {
        this.dataSource = new PageDataSource<Gossip>();
    }

    ngOnInit() {
        this.load();
    }
    searchInput() {
        this.pageIndex = 0;
        this.load();
    }
    load() {
        let params = new HttpParams()
            .set("page", this.pageIndex.toString())
            .set("size", this.pageSize.toString());
        if (this.likeUsername) {
            params = params.set("likeUsername", this.likeUsername);
        }
        this.gossipService.getGags({ params }).subscribe((page: any) => {
            this.dataSource.data = page;
        });
    }

    onPageChange(page: any) {
        this.pageIndex = page.pageIndex;
        this.load();
    }

    refresh() {
        this.load();
    }

    filterTime(time: number) {
        return this.datePipe.transform(time, 'MM/dd/yyyy');
    }

    search(e: any) {
        let key = e.keyCode || e.which;
        if(key == 13) {
            this.searchInput();
        }
    }
    delete(row: Gossip) {
        this.messageBoxService.confirm('确实删除' + row.username + '?').handle.then(() => {
            this.gossipService.delete(row.gagId).subscribe(() => {
                this.toastService.success('删除成功');
                this.load();
            }, (response) => {
                this.toastService.error(response.error.msg);
            })
        }, () => {

        })
    }
    edit(row: Gossip) {
        const ref: ModalRef = this.modalService.open(GagInfoComponent, {
            data: row.gagId
        });
        ref.didDisappear().subscribe((data: any) => {
            if(data) {
                this.load();
            }
        })
    }
}
