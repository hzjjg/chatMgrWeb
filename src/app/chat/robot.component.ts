import { Component, OnInit } from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {ToastService} from "../../rui/packages/toast/toast.service";
import {RoomService} from "./room.service";
import {RobotService} from "./robot.service";
import {Robot, RobotType} from "./robot";
import {SimpleDataSource} from "../shared/material-utils";
import {MessageBoxService} from "../../rui/packages/message-box/message-box.service";
import {ModalRef} from "../../rui/packages/modal/modal-ref";
import {ModalService} from "../../rui/packages/modal/modal.service";
import {RobotInfoComponent} from "./robot-info.component";
import {RobotAutomaticComponent} from "./robot-automatic.component";

@Component({
    templateUrl: 'robot.component.html',
    styleUrls: ['robot.component.scss']
})
export class RobotComponent implements OnInit {
    roomNo: string;
    displayedColumns = ['nickname', 'username', 'userType', 'operation'];
    robots: Robot[];
    dataSource: RobotDataSource;
    robotType: RobotType;
    constructor(
        private activatedRoute: ActivatedRoute,
        private roomService: RoomService,
        private toastService: ToastService,
        private robotService: RobotService,
        private messageBoxService: MessageBoxService,
        private modalService: ModalService
    ) {
        this.dataSource = new RobotDataSource();
    }

    ngOnInit() {
        this.roomNo = this.activatedRoute.parent.snapshot.params.roomNo;
        this.robotService.get(this.roomNo).subscribe(robots => {
            this.dataSource.data = robots;
        })
        this.robotType = new RobotType();
    }

    filterRobotType(type: string) {
        switch(type) {
            case this.robotType.Customer: return '客户';
            case this.robotType.Visitor: return '游客';
            case this.robotType.Staff: return '员工';
        }
    }

    createRobot() {
        let robot = new Robot();
        robot.roomNo = this.roomNo;
        robot.avatar = '/images/avatar/0.jpg';
        const ref: ModalRef = this.modalService.open(RobotInfoComponent, {
            data: robot
        });
        ref.didDisappear().subscribe(robot => {
            if (robot) {
                this.dataSource.data = this.dataSource.data.concat(robot);
            }
        });
    }

    editRobot(row: Robot) {
        const index = this.dataSource.data.indexOf(row);
        const ref: ModalRef = this.modalService.open(RobotInfoComponent, {
            data: Object.assign({}, row)
        });
        ref.didDisappear().subscribe(robot => {
            if (robot) {
                let data = this.dataSource.data.slice();
                data.splice(index, 1, robot);
                this.dataSource.data = data;
            }
        })
    }

    deleteRobot(row: Robot) {
        this.messageBoxService.confirm(`确认是否删除 "${row.nickname}"`)
            .handle.then(() => {
            this.robotService.delete(row).subscribe(() => {
                this.dataSource.data = this.dataSource.data.filter(value => {
                    return value.robotId != row.robotId;
                });
                this.toastService.show({
                    message: '删除成功',
                    type: 'success',
                    position: 'top'
                })
            })
        })
    }

    automaticCreateRobot() {
        const ref: ModalRef = this.modalService.open(RobotAutomaticComponent, {
            data: this.roomNo
        });
        ref.didDisappear().subscribe(robots => {
            if (robots) {
                this.dataSource.data = this.dataSource.data.concat(robots);
            }
        });
    }
}

export class RobotDataSource extends SimpleDataSource<Robot> {
    map(data: Robot[], filter: any): Robot[] {
        return data.filter(value => {
            return !filter || value.robotId == filter;
        })
    }
}