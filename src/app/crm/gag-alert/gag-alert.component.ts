import {Component, Inject} from "@angular/core";
import {EditGossip, Gossip} from "../../control/gossip";
import {MODAL_DATA} from "../../../rui/packages/modal/modal.service";
import {ModalRef} from "../../../rui/packages/modal/modal-ref";
import {DatePipe} from "@angular/common";

@Component({
    selector: 'gag-alert',
    templateUrl: 'gag-alert.component.html',
    styleUrls: ['./gag-alert.component.scss'],
    providers: [DatePipe]
})

export class GagAlertComponent {
    gags: EditGossip[];

    constructor(
        @Inject(MODAL_DATA) gags: Gossip[],
        public modalRef: ModalRef,
        private datePipe: DatePipe
    ) {
        this.gags = (gags || []).map((gag) => {
            return {
                gagId: gag.gagId,
                reason: gag.reason,
                expireDate: gag.expireTime ? new Date(gag.expireTime): null,
                createDate: new Date(gag.createTime),
            }
        })
    }

    formatDate(date: Date) {
        return this.datePipe.transform(date, 'dd/MM/yyyy');
    }
}