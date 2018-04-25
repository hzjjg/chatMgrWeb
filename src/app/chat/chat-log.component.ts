import { Component, OnInit } from "@angular/core";
import { ChatLog } from "./chat-log";
import { ActivatedRoute } from "@angular/router";
import { PageDataSource } from "../shared/material-utils";
import { ChatLogService } from "./chat-log.service";
import { MessageBoxService } from "../../rui/packages/message-box/message-box.service";
import { ToastService } from "../../rui/packages/toast/toast.service";
import { HttpParams } from "@angular/common/http";
import {ModalRef} from "../../rui/packages/modal/modal-ref";
import {RoomPlanContentComponent} from "./room-plan-content.component";
import {ModalService} from "../../rui/packages/modal/modal.service";
import {RedPacketComponent} from "../financial/red-packet/red-packet.component";

@Component({
    templateUrl: 'chat-log.component.html',
    styleUrls: ['chat-log.component.scss']
})
export class ChatLogComponent implements OnInit {

    roomNo: string;
    displayedColumns = ['content', 'username', 'fromNick', 'msgType', 'time', 'operation'];
    dataSource: PageDataSource<ChatLog>;

    pageSize: number = 10;
    pageIndex: number = 0;

    loading: boolean = false;

    startDate: Date;
    endDate: Date;
    username: string;
    likeFromNick: string;

    constructor(
        private activatedRoute: ActivatedRoute,
        private chatLogService: ChatLogService,
        private messageBoxService: MessageBoxService,
        private toastService: ToastService,
        private modalService: ModalService
    ) {
        this.dataSource = new PageDataSource<ChatLog>();
    }

    watchDate() {
        if(this.endDate && this.startDate > this.endDate) {
            this.endDate = null;
        }
        this.pageIndex = 0;
        this.load();
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

    load(finfishLoad?: Function) {
        let params = new HttpParams()
            .set("page", this.pageIndex.toString())
            .set("size", this.pageSize.toString())
            .set('roomNo', this.roomNo);

        if(this.username) {
            params = params.set("username", this.username);
        }
        if(this.likeFromNick) {
            params = params.set("likeFromNick", this.likeFromNick);
        }
        if(this.startDate) {
            params = params.set("startTime", this.startDate.getTime().toString());
        }
        if(this.endDate) {
            params = params.set("endTime", this.endDate.getTime().toString());
        }
        this.loading = true;
        this.chatLogService.get({ params }).subscribe((data: any) => {
            this.loading = false;
            this.dataSource.data = data;
            if (finfishLoad) {
                finfishLoad();
            }
        })
    }
    ngOnInit() {
        this.roomNo = this.activatedRoute.parent.snapshot.params.roomNo;
        this.load();
    }

    onPageChange(page: any) {
        this.pageIndex = page.pageIndex;
        this.load();
    }

    delete(row: ChatLog) {
        this.messageBoxService.confirm(`确认是否删除该条记录`)
            .handle.then(() => {
                this.loading = true;
                this.chatLogService.delete(row).subscribe((data: any) => {
                    this.loading = false;
                    this.refresh();
                    this.toastService.show({
                        message: '删除成功',
                        type: 'success',
                        position: 'top'
                    })
                }, () => {
                    this.loading = false;
                    this.toastService.show({
                        message: '删除失败',
                        type: 'error',
                        position: 'top'
                    })
                })
            })
    }

    deleteByDayNumberBefore(dayNum: number) {
        let date = new Date();
        date.setDate(date.getDate() - dayNum);
        // date.setHours(0, 0, 0, 0); 不需要置空
        let lowerTime = date.getTime();
        this.messageBoxService.confirm(`确认是否删除${dayNum}天前的记录`)
            .handle.then(() => {
                this.loading = true;
                this.chatLogService.deleteBatch(this.roomNo, lowerTime).subscribe((data: any) => {
                    this.loading = false;
                    this.refresh();
                    this.toastService.show({
                        message: `成功删除${data.deleteTotal}条记录!`,
                        type: 'success',
                        position: 'top'
                    })
                }, () => {
                    this.loading = false;
                    this.toastService.show({
                        message: '删除失败',
                        type: 'error',
                        position: 'top'
                    })
                })
            })
    }
    searchInput() {
        this.pageIndex = 0;
        this.load();
    }
    search(e: any) {
        let key = e.keyCode || e.which;
        if(key == 13) {
            this.searchInput();
        }
    }

    refresh() {
        this.load(() => {
            this.toastService.success("刷新成功")
        });
    }

    openNotice(content: string) {
        const ref: ModalRef = this.modalService.open(RoomPlanContentComponent, {
            data: content
        })
    }

    lookRedPacket(row: any) {
        const ref: ModalRef = this.modalService.open(RedPacketComponent, {
            data: row.packetId
        })
    }
}