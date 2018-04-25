import { Component, OnInit } from "@angular/core";
import { IMUser, Terminal } from "./im-user";
import { SimpleDataSource } from "../shared/material-utils";
import { ToastService, ModalService, MessageBoxService } from "../rui";
import { RoomService } from "./room.service";
import { ActivatedRoute } from "@angular/router";
import { ModalRef } from "../../rui/packages/modal/modal-ref";
import { UserAgentComponent } from "./user-agent.component";
import {RobotType} from "./robot";
import {GagInfoComponent} from "../control/gag-info/gag-info.component";
import {GagCreateComponent} from "../crm/gag-create/gag-create.component";
import {GagAlertComponent} from "../crm/gag-alert/gag-alert.component";

@Component({
    templateUrl: 'im-user.component.html',
    styleUrls:['im-user.component.scss']
})
export class IMUserComponent implements OnInit {
    displayedColumns = ['nickname', 'userType', 'username', 'ip', 'host', 'operatingSystem', 'operation'];
    dataSource: IMUserDataSource;
    roomNo: string;
    terminal = Terminal;
    filterType: RobotType;
    onlineNumber: number;
    visitorNumber: number;
    customerNumber: number;
    selectUserType: string = '';
    originalData: IMUser[];
    constructor(
        private activatedRoute: ActivatedRoute,
        private modalService: ModalService,
        private messageBoxService: MessageBoxService,
        private toastService: ToastService,
        private roomService: RoomService,

    ) {
        this.dataSource = new IMUserDataSource();
    }
    ngOnInit() {
        this.load();
        this.filterType = new RobotType();
    }

    selectType(selectUserType: string) {
        this.selectUserType = selectUserType;
        this.filterHuman();
    }

    filterHuman() {
        if(!this.selectUserType) {
            this.dataSource.data = this.originalData;
            this.amount();
            return;
        }
        let data = (this.originalData || []).filter((item: IMUser) => {
            return item.userType == this.selectUserType;
        });
        this.dataSource.data = data;
        this.amount();
    }

    amount() {
        if(this.dataSource.data) {
            this.onlineNumber = this.dataSource.data.length;
            let visitorNumber: number = 0;
            let customerNumber: number = 0;
            (this.dataSource.data || []).forEach((user: any) => {
                if(user.userType == 'Visitor') {
                    visitorNumber++;
                }
                if(user.userType == 'Customer') {
                    customerNumber++;
                }
            })
            this.visitorNumber = visitorNumber;
            this.customerNumber = customerNumber;
        }
    }

    load() {
        this.roomNo = this.activatedRoute.parent.snapshot.params.roomNo;
        this.roomService.getRoomUsers(this.roomNo).subscribe(users => {
            // this.dataSource.data = users;
            this.originalData = users;
            this.filterHuman();
        });
    }

    filterUserType(type: string) {
        switch (type) {
            case this.filterType.Customer: return '客户';
            case this.filterType.Visitor: return '游客';
            case this.filterType.Staff: return '员工';
        }
    }
    tick(user: IMUser) {
        this.messageBoxService.confirm(`确认是否踢出 "${user.nickname}"`).handle.then(value => {
            this.roomService.removeRoomUser(this.roomNo, user.userId).subscribe(() => {
                this.dataSource.data = this.dataSource.data.filter(value => {
                    return value.userId != user.userId;
                });
                this.toastService.show({
                    message: '踢出成功',
                    type: 'success',
                    position: 'top'
                })
            });
        }, (response) => {
            this.toastService.error(response.error.msg);
        })
    }

    openUserAgent(userAgent: string) {
        let agentModal: ModalRef = this.modalService.open(UserAgentComponent, {
            data: userAgent
        })
    }

    toggleGossip(row: IMUser) {
        const ref: ModalRef = this.modalService.open(GagCreateComponent, {
            data: row
        });
        ref.didDisappear().subscribe((data) => {
            if(data) {
                this.load();
            }
        })
    }
    refresh() {
        this.load();
    }

    openGagAlert(row: any) {
        if(row.gags.length == 0) {
            return;
        }
        const ref: ModalRef = this.modalService.open(GagAlertComponent, {
            data: row.gags
        })
    }

}

export class IMUserDataSource extends SimpleDataSource<IMUser> {

    map(data: IMUser[], filter: any): IMUser[] {
        return data.filter(value => {
            // return !filter || value.username == filter;
            return true;
        })
    }
}