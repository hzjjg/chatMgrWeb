import {Component, Inject} from "@angular/core";
import {ModalRef} from "../../rui/packages/modal/modal-ref";
import {Transaction, TransactionType, TransferType} from "./transfer";
import {MODAL_DATA} from "../../rui/packages/modal/modal.service";
import {Cst} from "./cst";
import {TransferService} from "./transfer.service";
import {ToastService} from "../../rui/packages/toast/toast.service";

@Component({
    selector: 'transfer',
    templateUrl: 'transfer.component.html'
})

export class TransferComponent {
    transaction: Transaction;
    transferTypes: any[];
    transferType: TransferType;

    row: Cst;

    constructor(
        @Inject(MODAL_DATA) data: Cst,
        public modalRef: ModalRef,
        private transferService: TransferService,
        private toastService: ToastService
    ) {
        this.row = data;
    }

    ngOnInit() {
        this.transaction = new Transaction();
        this.transaction.relationUsername = this.row.username;
        this.transferType = new TransferType();
        this.transferTypes = [
            {
                type: this.transferType.TO,
                name: '转入'
            },
            {
                type: this.transferType.OUT,
                name: '转出'
            }
        ];
        if(this.transaction && !this.transaction.transferType) {
            this.transaction.transferType = this.transferTypes[0].type;
        }
    }

    submit() {
        let customerId = this.row.cstId;
        delete this.transaction.relationUsername;
        this.transferService.post(customerId, this.transaction).subscribe(() => {
            this.modalRef.close('ok');
        }, (response) => {
            this.toastService.error(response.msg);
        })
    }
}