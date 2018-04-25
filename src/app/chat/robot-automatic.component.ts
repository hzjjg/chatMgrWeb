import {Component, Inject} from "@angular/core";
import {RobotService} from "./robot.service";
import {Robot, RobotType} from "./robot";
import {ToastService} from "../../rui/packages/toast/toast.service";
import {inject} from "@angular/core/testing";
import {MODAL_DATA} from "../../rui/packages/modal/modal.service";
import {ModalRef} from "../../rui/packages/modal/modal-ref";

@Component({
    selector: 'robot-automatic',
    templateUrl: 'robot-automatic.component.html',
    styleUrls: ['./robot-automatic.component.scss']
})

export class RobotAutomaticComponent {
    robots: Robot[] = [];
    robotType: RobotType;
    userTypes: any[];
    roomNo: string;
    saveLoading: boolean = false;

    constructor(
        private robotService: RobotService,
        private toastService: ToastService,
        @Inject(MODAL_DATA) roomNo: string,
        public modalRef: ModalRef
    ) {
        this.roomNo = roomNo;
    }

    ngOnInit() {
        this.robotType = new RobotType();
        this.userTypes = [
            {
                type: 'Visitor',
                name: '游客'
            },
            {
                type: 'Customer',
                name: '客户'
            },
            {
                type: 'Staff',
                name: '员工'
            }
        ];
        this.load();
    }

    load() {
        this.robots = [];
        this.robotService.getRobotAutomatic().subscribe((data: string[]) => {
            data.map((item) => {
                this.robots.push({
                    roomNo: this.roomNo,
                    userType: this.robotType.Visitor,
                    username: item,
                    nickname: item,
                    avatar: '/images/avatar/' + Math.ceil(Math.random() * 24) + '.jpg'
                })
            });
        });
    }

    setRobotType(e: any) {
        const userType = e.target.value;
        this.robots.forEach((robot) => {
            robot.userType = userType;
        });
    }
    filterRobotType(type: string) {
        switch(type) {
            case this.robotType.Customer: return '客户';
            case this.robotType.Visitor: return '游客';
            case this.robotType.Staff: return '员工';
        }
    }

    refresh() {
        this.load();
    }

    sureAdd() {
        this.saveLoading = true;
        const robots: Robot[] = [];
        this.robots.forEach((robot, index) => {
            this.robotService.create(robot).subscribe((value) => {
                robots.push(Object.assign(robot, value));
                if(this.robots.length == index + 1) {
                    this.saveLoading = false;
                    this.modalRef.close(robots);
                }
            })
        })
    }
}