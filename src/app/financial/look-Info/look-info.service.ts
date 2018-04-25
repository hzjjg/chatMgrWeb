import { Injectable } from "@angular/core";
import {StaffService} from "../../organ/staff.service";
import {ModalService} from "../../../rui/packages/modal/modal.service";
import {LookInfoComponent} from "./look-info.component";
import {ToastService} from "../../../rui/packages/toast/toast.service";
import {Staff} from "../../organ/staff";

@Injectable()
export class LookInfoService {

    constructor(
        private staffService: StaffService,
        private modalService: ModalService,
        private toastService: ToastService
    ) {

    }

    get(staffId: number) {
        this.staffService.getStaff(staffId).subscribe((data: Staff) => {
            this.modalService.open(LookInfoComponent, {
                data: data
            })
        }, (response: any) => {
            this.toastService.error('加载失败');
        })
    }
}