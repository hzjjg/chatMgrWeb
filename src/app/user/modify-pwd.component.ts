import { Component, OnInit } from "@angular/core";
import { ModalRef } from "../../rui/packages/modal/modal-ref";
import { UserService } from "./user.service";
import {ToastService} from "../../rui/packages/toast/toast.service";

@Component({
    selector: 'modify-pwd',
    templateUrl: 'modify-pwd.component.html'
})
export class ModifyPwdComponent implements OnInit {
    pwd: string;
    newPwd: string;
    confirmPwd: string;
    constructor(
        public modalRef: ModalRef,
        private toastService: ToastService,
        private userService: UserService
    ) {

    }
    ngOnInit() {

    }

    submit() {
        this.userService.modifyPwd(
            this.pwd,
            this.newPwd
        ).subscribe(() => {
            this.toastService.success("密码修改成功!");
            this.modalRef.close();
        }, (response) => {
            this.toastService.error(response.error.msg);
        });
    }
}