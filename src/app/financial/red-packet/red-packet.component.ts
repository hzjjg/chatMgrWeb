import {Component, Inject} from "@angular/core";
import {TransactionService} from "../transaction.service";
import {MODAL_DATA, ModalRef} from "../../../rui/packages/modal";
import {RedPacket} from "./red-packet";
import {ToastService} from "../../../rui/packages/toast";

@Component({
    selector: 'red-packet',
    templateUrl: 'red-packet.component.html',
    styleUrls: ['./red-packet.component.scss']
})

export class RedPacketComponent {

    redPacket: RedPacket;
    packetId: any;
    loading: boolean = false;

    constructor(
        private transactionService: TransactionService,
        public modalRef: ModalRef,
        @Inject(MODAL_DATA) packetId: any,
        private toastService: ToastService
    ) {
        this.packetId = packetId;
    }

    ngOnInit() {
        this.loading = true;
        this.transactionService.redPacket(this.packetId).subscribe((redPacket: RedPacket) => {
            this.loading = false;
            this.redPacket = redPacket;
        }, (res) => {
            this.loading = false;
            this.toastService.error(res.error.msg);
        })
    }
}