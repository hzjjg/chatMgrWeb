import { Component, OnInit } from "@angular/core";
import {ActivatedRoute} from "@angular/router";

@Component({
    selector: 'user',
    templateUrl: 'user.component.html',
    host: {
        "class": "container-fluid mx-3 my-3",
    }
})
export class UserComponent implements OnInit {
    tabs = [{
        title: '个人信息',
        link: 'profile'
    }, {
        title: '安全设置',
        link: 'security'
    }, {
        title: '操作日志',
        link: 'op-logs'
    }];
    subTitle: string = '123';
    constructor(
        private activatedRoute: ActivatedRoute,
    ) {
        // activatedRoute.url.subscribe((url)=> {
        // console.log(url);
        // this.subTitle = url[1].path;
        // })
        // console.log();
        // activatedRoute.children[0].data.subscribe((data) => {
        //     this.subTitle = data.title;
        // })
    }
    ngOnInit() {
        // this.user = activatedRoute.snapshot.data.user;
    }
}