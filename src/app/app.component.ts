

import { Component, InjectionToken, OnInit, ViewEncapsulation } from "@angular/core";
import { UserService } from "./user/user.service";
import { SocketIO } from "./system/socket.io";
import { environment } from "../environments/environment";
import { AudioService } from "./system/audio.service";
import { ToastService } from "../rui";
import { NoticeService } from "../rui/packages/notice/notice.service";
import { DatePipe } from "@angular/common";

@Component({
    selector: 'root-app',
    templateUrl: 'app.component.html',
    styleUrls: [
        'app.component.scss'
    ],
    encapsulation: ViewEncapsulation.None,
    providers:[DatePipe]
})
export class AppComponent implements OnInit {

    timer: any;

    constructor(
        private userService: UserService,
        private socket: SocketIO,
        private audioService: AudioService,
        private toastService: ToastService,
        private noticeService: NoticeService,
        private datePipe:DatePipe
    ) {
        this.socket.connect('/');

        this.socket.workSubject.subscribe((data: any) => {
            // this.audioService.play();
            // this.toastService.warning("有新的事务待处理");

            this.play();
        });
        
        this.socket.newCstSubject.subscribe(data => {
            this.play();
            this.noticeService.notify(`${data.username}`,'有新用户：',this.datePipe.transform(data.createTime,'yyyy-MM-dd'));
        })

        this.userService.fetch().subscribe(() => {
            //请求
        });
    }
    ngOnInit(
    ) {

    }

    play() {
        this.audioService.play();
        //this.toastService.warning("有新的事务待处理");
    }
}