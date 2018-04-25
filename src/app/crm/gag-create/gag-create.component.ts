import {Component, Inject} from "@angular/core";
import {Cst} from "../cst";
import {GossipService} from "../../control/gossip.service";
import {MODAL_DATA} from "../../../rui/packages/modal/modal.service";
import {ToastService} from "../../../rui/packages/toast/toast.service";
import {Gossip} from "../../control/gossip";
import {ModalRef} from "../../../rui/packages/modal/modal-ref";

@Component({
    selector: 'gag-create',
    templateUrl: 'gag-create.component.html'
})

export class GagCreateComponent {

    cst: Cst;
    expireDate: Date;
    reason: string;

    constructor(
        private gossipService: GossipService,
        @Inject(MODAL_DATA) cst: Cst,
        private toastService: ToastService,
        public modalRef: ModalRef,
    ) {
        this.cst = cst;
    }

    ngOnInit() {

    }

    submit() {
        const params: Gossip = {
            userId: this.cst.userId,
            reason: this.reason,
            expireTime: this.expireDate ? this.expireDate.getTime() : null
        };

        this.gossipService.create(params).subscribe((response) => {
            this.toastService.success('设置成功!');
            this.modalRef.close('ok');
        }, (response) => {
            this.toastService.error(response.error.msg);
        })
    }
}