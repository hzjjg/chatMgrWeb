import { Component, OnInit } from "@angular/core";
import {UserService} from "./user.service";
import {ActivatedRoute} from "@angular/router";
import {UserProfile} from "./user-profile";
import {Staff} from "../organ/staff";
import {ToastService} from "../rui";
import {RoleService} from "../organ/role.service";
import {Role} from "../organ/role";

@Component({
    selector: 'profile',
    templateUrl: 'profile.component.html',
    styleUrls: ['profile.component.scss']
})
export class ProfileComponent implements OnInit {
    user: Staff;
    role: Role;
    profile: UserProfile;

    constructor(
        private activatedRoute: ActivatedRoute,
        private userService: UserService,
        private toastService: ToastService,
        private roleService: RoleService
    ) {

    }

    ngOnInit() {
        // this.userService.fetch().subscribe((user), {
        //
        // })

        this.user = this.activatedRoute.snapshot.data.user;
        this.profile = this.activatedRoute.snapshot.data.profile;

        if (this.user.roleId) {
            this.roleService.getEntity(this.user.roleId).subscribe((role: any) => {
                this.role = role;
            })
        }
    }

    submit() {;
        this.userService.updateProfile(this.profile).subscribe(() => {
            Object.assign(this.user, this.profile);
            this.toastService.success("个人信息保存成功");
        }, (response) => {
            this.toastService.error(response.error.msg)
        }, () => {

        })
    }
}