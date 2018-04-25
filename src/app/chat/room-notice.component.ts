import {Component} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {RoomNoticeService} from "./room-notice.service";
import {QQInfo, QrCode} from "./room-notice";
import {ToastService} from "../../rui/packages/toast/toast.service";
import {MessageBoxService} from "../../rui/packages/message-box/message-box.service";

@Component({
    selector: 'room-notice',
    templateUrl: 'room-notice.component.html',
    styleUrls: ['./room-notice.component.scss']
})

export class RoomNoticeComponent {

    roomNo: string;
    qrCode: QrCode;
    qqInfo: QQInfo;
    showQrCode: boolean = false;
    showQQInfo: boolean = false;
    loading: boolean = false;

    constructor(
        private activatedRoute: ActivatedRoute,
        private roomNoticeService: RoomNoticeService,
        private toastService: ToastService,
        private messageBoxService: MessageBoxService
    ) {

    }
    ngOnInit() {
        this.roomNo = this.activatedRoute.parent.snapshot.params.roomNo;
        this.refreshQQ();
    }

    loadQrCode() {
        this.loading = true;
        this.roomNoticeService.get(this.roomNo).subscribe((data: QrCode) => {
            this.loading = false;
            this.qrCode = data;
        },(res) => {
            this.loading = false;
            this.toastService.error(res.error.msg)
        }, () => {
            this.loading = false;
        })
    }

    refreshQQ() {
        this.roomNoticeService.getQQ(this.roomNo).subscribe((data: QQInfo) => {
            if(data && !data.account) {
                this.showQrCode = true;
                return;
            }
            this.showQQInfo = true;
            this.qqInfo = data;
        }, (res) => {
            this.toastService.error(res.error.msg)
        })
    }

    refresh() {
        this.loadQrCode();
    }
    signOut() {
        this.messageBoxService.confirm(`确认退出?`).handle.then(() => {
            this.roomNoticeService.deleteQQ(this.roomNo).subscribe(() => {
                this.showQQInfo = false;
                this.refreshQQ();
            }, (res) => {
                this.toastService.error(res.error.msg)
            });
        }, () => {

        })
    }
}