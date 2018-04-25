import {Component, OnInit, Renderer2, TemplateRef, ViewChild, ViewRef} from "@angular/core";
import {StaffService} from "./staff.service";
import {Staff} from "./staff";
import {CollectionViewer, DataSource} from "@angular/cdk/collections";
import {Observable} from "rxjs/Observable";
import {ModalService, ModalRef, MessageBoxService, ToastService} from "../rui";
import {StaffInfoComponent} from "./staff-info.component";
import {RoleInfoComponent} from "./role-info.component";
import {RoleService} from "./role.service";
import {Role} from "./role";
import {SimpleDataSource} from "../shared/material-utils";
import {Cst} from "../crm/cst";
import {ResetCstPasswordComponent} from "../crm/reset-cst-password.component";

@Component({
    selector: 'staffs',
    templateUrl: 'staffs.component.html',
    styleUrls: ['staffs.component.scss']
})
export class StaffsComponent implements OnInit {
    displayedColumns = ['name', 'username', 'operation'];
    dataSource: StaffDataSource;
    roles: Role[];
    selectedRoleId: number | null;
    constructor(
        private modalService: ModalService,
        private messageBoxService: MessageBoxService,
        private staffService: StaffService,
        private roleService: RoleService,
        private toastService: ToastService,
        private renderer: Renderer2
    ) {
        this.dataSource = new StaffDataSource();
    }

    ngOnInit() {
        this.staffService.getStaffs().subscribe(staffs => {
            this.dataSource.data = staffs;
        }, response  => {
            this.toastService.error(response.error.msg);
        }, () => {
            //加载关闭
        });
        this.roleService.getEntities().subscribe(roles => {
            this.roles = roles;
        }, response  => {
            this.toastService.error(response.error.msg);
        }, () => {
            //加载关闭
        });
    }

    changeSelectedRoleId(roleId: number | null) {
        this.selectedRoleId = roleId;
        this.dataSource.filter = this.selectedRoleId;
    }

    createStaff() {
        let staff = new Staff();
        const ref: ModalRef = this.modalService.open(StaffInfoComponent, {
            data: staff
        });
        ref.didDisappear().subscribe(staff => {
            if (staff) {
                this.dataSource.data = this.dataSource.data.concat(staff);
            }
        });
    }
    editStaff(row: Staff) {
        const index = this.dataSource.data.indexOf(row);
        const ref: ModalRef = this.modalService.open(StaffInfoComponent, {
            data: row
        });
        ref.didDisappear().subscribe(staff => {
            if (staff) {
                let data = this.dataSource.data.slice();
                data.splice(index, 1, staff);
                this.dataSource.data = data;
            }
        })
    }
    deleteStaff(row: Staff) {
        this.messageBoxService.confirm(`确认是否删除 "${row.name}"`).handle.then(() => {
            this.staffService.delete(row.staffId).subscribe(()=> {
                this.dataSource.data = this.dataSource.data.filter(value => {
                   return value.staffId != row.staffId;
                });
                this.toastService.show({
                    message: '删除成功',
                    type: 'success',
                    position: 'top'
                })
            }, response  => {
                this.toastService.error(response.error.msg);
            }, () => {
                //加载关闭
            })
        });
    }
    resetPassword(row: Staff) {
        const ref = this.modalService.open(ResetCstPasswordComponent, {
            data: row
        })
    }
    reloadRoles() {
        this.roleService.getEntities().subscribe(roles => {
            this.roles = roles;
        }, () => {
            //加载角色失败
        });
    }
    createRole() {
        let role = new Role();
        const ref: ModalRef = this.modalService.open(RoleInfoComponent, {
            data: role
        });
        // this.renderer.setStyle(ref.container.elementRef.nativeElement, 'width', '800px')
        ref.didDisappear().subscribe((role) => {
            if (role) {
                this.roles.push(role);
            }
        });
    }
    editRole(role: Role) {
        const index = this.roles.indexOf(role);
        const ref: ModalRef = this.modalService.open(RoleInfoComponent, {
            data: role
        });
        ref.didDisappear().subscribe((role) => {
            if (role) {
                this.roles.splice(index, 1, role);
            }
        });
    }

    deleteRole(role: Role) {
        const index = this.roles.indexOf(role);
        this.messageBoxService.confirm(`确认是否删除 "${role.name}" ?`).handle.then(() => {
            this.roleService.delete(role.roleId).subscribe(() => {
                this.roles.splice(index, 1);
            }, response  => {
                this.toastService.error(response.error.msg);
            }, () => {
                //加载关闭
            })
        }, () => {

        })
    }
}
export class StaffDataSource extends SimpleDataSource<Staff> {

    map(data: Staff[], filter: any): Staff[] {
        return data.filter(value => {
            return !filter || value.roleId == filter;
        })
    }
}