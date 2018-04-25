import {Component, Inject} from "@angular/core";
import {Cst, GagInfo} from "../../crm/cst";
import {MODAL_DATA} from "../../../rui/packages/modal/modal.service";
import {ModalRef} from "../../../rui/packages/modal/modal-ref";
import {CstService} from "../../crm/cst.service";
import {ToastService} from "../../../rui/packages/toast/toast.service";
import {EditGossip, Gossip} from "../gossip";
import {GossipService} from "../gossip.service";

@Component({
    selector: 'gag-info',
    templateUrl: 'gag-info.component.html'
})

export class GagInfoComponent {
    gagId: any;
    gag: EditGossip;

    constructor(
        public modalRef: ModalRef,
        @Inject(MODAL_DATA) gagId: any,
        private toastService: ToastService,
        private gossipService: GossipService
    ) {
        this.gagId = gagId;
    }

    ngOnInit() {
        this.gossipService.getGag(this.gagId).subscribe((data: Gossip) => {
            this.gag = {
                gagId: data.gagId,
                userId: data.userId,
                userType: data.userType,
                relationId: data.relationId,
                username: data.username,
                reason: data.reason,
                expireDate: data.expireTime ? new Date(data.expireTime) : null,
                createDate: new Date(data.createTime)
            }
        })
    }

    submit() {
        const params: Gossip = {
            gagId: this.gag.gagId,
            reason: this.gag.reason,
            expireTime: this.gag.expireDate ? this.gag.expireDate.getTime() : null
        };
        this.gossipService.update(params).subscribe((response) => {
            this.toastService.success('保存成功');
            this.modalRef.close('ok')
        }, (response) => {
            this.toastService.close(response.error.msg);
        })
    }
}