import { Component, OnInit, Inject } from '@angular/core';
import { ModalRef } from '../../rui/packages/modal/modal-ref';
import { MODAL_DATA } from '../../rui/packages/modal/modal.service';
import { Cst } from './cst';
import { CstService } from './cst.service';
import { ToastService } from '../../rui/packages/toast/toast.service';
import {StaffService} from "../organ/staff.service";

@Component({
    templateUrl: 'reset-cst-password.component.html'
})

export class ResetCstPasswordComponent implements OnInit {
    password: string;
    id: any;
    info: any;
    constructor(
        private modalRef: ModalRef,
        private cstService: CstService,
        private staffService: StaffService,
        private toastService: ToastService,
        @Inject(MODAL_DATA) data: any,
    ) {
        this.id = data;
        this.info = data;
    }

    ngOnInit() { }

    close() {
        this.modalRef.close();
    }

    submit() {
        const params = this.info;
        if(params.cstId) {
            this.cstService.resetPassword(params.cstId, this.password).subscribe((response) => {
                this.toastService.success("修改成功");
                this.modalRef.close();
            }, (response) => {
                this.toastService.error(response.error.msg)
            })
        }
        if(params.staffId) {
            this.staffService.resetPassword(params.staffId, this.password).subscribe((response) => {
                this.toastService.success("修改成功");
                this.modalRef.close();
            }, (response) => {
                this.toastService.error(response.error.msg)
            })
        }
    }
}