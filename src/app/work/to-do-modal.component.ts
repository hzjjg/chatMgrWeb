import {Component, Inject} from "@angular/core";
import {ConversionMoneyWork, WorkReviewStatus} from "./work";
import {MODAL_DATA} from "../../rui/packages/modal/modal.service";
import {ModalRef} from "../../rui/packages/modal/modal-ref";
import {WorkService} from "./work.service";
import {ToastService} from "../../rui/packages/toast";

@Component({
    selector: 'to-do-modal',
    templateUrl: 'to-do-modal.component.html',
    styleUrls: ['to-do-modal.component.scss']
})

export class ToDoModalComponent {

    row: ConversionMoneyWork;

    constructor(
        @Inject(MODAL_DATA) data: any,
        public modalRef: ModalRef,
        private workService: WorkService,
        private toastService: ToastService
    ) {
        this.row = data.row;
    }


    submit(value: WorkReviewStatus) {
        // this.row.status = 'ADOPTED';
        // this.row.reason;

        let params = {
            status: value,
            reason: this.row.reason
        };
        this.workService.putWork(this.row.workId, params).subscribe(() => {
            this.modalRef.close(Object.assign(this.row, params));
        }, (res) => {
            this.toastService.error(res.error.msg);
        })
    }
}