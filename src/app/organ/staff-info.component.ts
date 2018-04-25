import {Component, Inject, OnInit} from "@angular/core";
import {ModalRef, MODAL_DATA, ToastService} from "../rui";
import {Staff} from "./staff";
import {StaffService} from "./staff.service";
import {Role} from "./role";
import {RoleService} from "./role.service";

@Component({
    selector: 'staff-info',
    templateUrl: 'staff-info.component.html',
})
export class StaffInfoComponent implements OnInit {
    staff: Staff;
    roles: Role[];
    constructor(
        public modalRef: ModalRef,
        private staffService: StaffService,
        private roleService: RoleService,
        private toastService: ToastService,
        @Inject(MODAL_DATA) staff: Staff,
    ) {
        this.staff = staff;
        this.roleService.getEntities().subscribe(roles => {
            this.roles = roles;
            if (!this.staff.staffId && this.roles.length > 0) {
                this.staff.roleId = this.roles[0].roleId;
            }
        });
    }
    ngOnInit() {

    }

    submit() {
        if (!this.staff.staffId) {
            this.staffService.create(this.staff).subscribe(value => {
                Object.assign(this.staff, value);
                this.modalRef.close(this.staff);
            }, response  => {
                this.toastService.error(response.error.msg);
            }, () => {
                //加载关闭
            });
        } else {
            this.staffService.update(this.staff).subscribe(value => {
                this.modalRef.close(this.staff);
            }, response => {
                this.toastService.error(response.error.msg);
            })
        }

    }
}