import { Component, OnInit } from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {IMUser} from "../chat/im-user";
import {UserService} from "../user/user.service";
import {MessageBoxService} from "../../rui/packages/message-box/message-box.service";

@Component({
    selector: 'framework-header',
    templateUrl: 'header.component.html',
    styleUrls: ['header.component.scss'],
})
export class HeaderComponent implements OnInit {
    user: IMUser;
    constructor(
        private activatedRoute: ActivatedRoute,
        private userService: UserService,
        private messageBoxService: MessageBoxService
    ) {}
    ngOnInit() {
        // this.user = this.activatedRoute.snapshot.data.user;
        this.userService.fetch().subscribe((user: IMUser) => {
            this.user = user;
        })
    }

    signOut() {
        this.messageBoxService.confirm("确认是否退出登录").handle.then(() => {
            this.userService.logout().subscribe((res) => {
                window.location.href = '/sso/login';
            }, () => {

            });
        }, () => {

        })
    }
}