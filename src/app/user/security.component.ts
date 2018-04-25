import { Component, OnInit } from "@angular/core";
import { ModalService } from "../../rui/packages/modal/modal.service";
import { ModifyPwdComponent } from "./modify-pwd.component";
import { ModalRef } from "../../rui/packages/modal/modal-ref";
import { UserService } from "./user.service";
import { UserSecurity } from "./user-security";
import { ToastService } from "../../rui/packages/toast/toast.service";

@Component({
    selector: 'security',
    templateUrl: 'security.component.html',
    styleUrls: ['security.component.scss']
})
export class SecurityComponent implements OnInit {
    userSecurityInfo: UserSecurity

    constructor(
        private modalService: ModalService,
        private userService: UserService,
        private toastService: ToastService
    ) { }
    ngOnInit() {
        this.userService.getSecurity().subscribe((response) => {
            this.userSecurityInfo = response;
        }, (response) => {
            this.toastService.error(response.error.msg);
        })
    }

    modifyPwd() {
        let ref: ModalRef = this.modalService.open(ModifyPwdComponent);
        ref.didDisappear().subscribe((value) => {
            if (value) {
                //密码修改了
            }
        })
    }
}