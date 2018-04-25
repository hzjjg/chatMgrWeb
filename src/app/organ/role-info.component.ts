import {Component, Inject, OnInit} from "@angular/core";
import {ModalRef} from "../rui";
import {Role} from "./role";
import {RoleService} from "./role.service";
import {MODAL_DATA} from "../../rui/packages/modal/modal.service";
import {ToastService} from "../../rui/packages/toast/toast.service";
import {PermissionService} from "./permission.service";
import {AuthPermission, AuthPermissionCategory} from "./permission";

@Component({
    templateUrl: 'role-info.component.html',
    styleUrls: ['role-info.component.scss']
})
export class RoleInfoComponent implements OnInit {
    role: Role;


    _categories: AuthPermissionCategory[];
    operationNames: {} = {};
    activeIndex: number = 0;

    set categories(categories: AuthPermissionCategory[]) {
        this._categories = categories;
        this.operationNames = {};
        categories.forEach((category) => {
            category.permissions.forEach((permission: any) => {
                this.operationNames[permission.operation] = permission.name;
            })
        });
    }

    get categories() : AuthPermissionCategory[] {
        return this._categories;
    }

    constructor(
        public modalRef: ModalRef,
        private roleService: RoleService,
        private toastService: ToastService,
        private permissionService: PermissionService,
        @Inject(MODAL_DATA) role: Role,
    ) {
        this.role = role ? Object.assign({}, role) : new Role();
        this.role.permissions = Object.assign([], role.permissions);

        this.permissionService.getPermissionCategories().subscribe( permissions => {
            this.categories = permissions;
        })
    }

    ngOnInit() {

    }

    formatName(value: string) {
        return this.operationNames[value];
        // this.allPermissions.map((allPermission) => {
        //     allPermission.permissions.map((permission: any) => {
        //         if(permission.operation == value) {
        //             name = permission.name;
        //         }
        //     })
        // });
        // return name;
    }

    submit() {
        if(!this.role.name) {
            this.toastService.error('角色名称未填!');
            return;
        }
        if (!this.role.roleId) {
            this.roleService.create(this.role).subscribe(value => {
                Object.assign(this.role, value);
                this.modalRef.close(this.role);
            }, response => {
                this.toastService.error(response.error.msg);
            });
        } else {
            this.roleService.update(this.role).subscribe(value => {
                this.modalRef.close(this.role);
            }, response => {
                this.toastService.error(response.error.msg);
            })
        }
    }

    deletePermission(value: string) {
        let index = this.role.permissions.findIndex((item) => {
            return item == value;
        });
        // console.log(index, value);
        if (~index) {
            //同步:不知道为什么会错
            setTimeout(() => {
                this.role.permissions.splice(index, 1);
            })

        }
    }
    toggle(permission: any) {
        let index = (this.role.permissions || []).findIndex((item) => {
            return item == permission.operation;
        });
        if (!~index) {
            if(!this.role.permissions) {
                this.role.permissions = [];
            }
            this.role.permissions.push(permission.operation);
        } else {
            this.role.permissions.splice(index, 1);
        }
    }
}