import { Component, Inject } from "@angular/core";
import {Cst, UserType} from "./cst";
import { MODAL_DATA } from "../../rui/packages/modal/modal.service";
import { ModalRef } from "../../rui/packages/modal/modal-ref";
import { CstService } from "./cst.service";
import { ToastService } from "../../rui/packages/toast/toast.service";

@Component({
    selector: 'cst-info',
    templateUrl: 'cst-info.component.html',
    styleUrls: ['./cst-info.component.scss']
})

export class CstInfoComponent {
    cst: Cst;
    submitLoading: boolean;
    userStatus = UserType;

    constructor(
        @Inject(MODAL_DATA) cst: Cst,
        public modalRef: ModalRef,
        private cstSertive: CstService,
        private toastService: ToastService
    ) {
        this.cst = cst;
    }

    ngOnInit() {
    }

    onSubmit() {
        this.submitLoading = true;

        this.cstSertive.updateInfo(this.cst.cstId, {
            name: this.cst.name || '',
            qq: this.cst.qq || null,
            weChat: this.cst.weChat || null,
            phone: this.cst.phone || null,
        }).subscribe((response) => {
            this.submitLoading = false;
            this.toastService.success('保存成功');
            this.modalRef.close('ok');
        }, (response) => {
            this.submitLoading = false;
            this.toastService.error(response.error.msg);
        })
    }

    cancel() {
        this.modalRef.close()
    }
}