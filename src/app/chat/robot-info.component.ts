import {Component, ElementRef, Inject, Renderer2} from "@angular/core";
import {Robot} from "./robot";
import {MODAL_DATA, ModalService} from "../../rui/packages/modal/modal.service";
import {RobotService} from "./robot.service";
import {ModalRef} from "../../rui/packages/modal/modal-ref";
import {ToastService} from "../../rui/packages/toast/toast.service";
import {SettingAvatarComponent} from "./setting-avatar.component";

@Component({
    selector: 'robot-info',
    templateUrl: 'robot-info.component.html',
    styleUrls: ['./robot-info.component.scss']
})

export class RobotInfoComponent {
    robot: Robot;
    userTypes: any[];

    avatarModalRef: ModalRef;

    constructor(
        @Inject(MODAL_DATA) robot: Robot,
        private robotService: RobotService,
        public modalRef: ModalRef,
        private toastService: ToastService,
        private modalService: ModalService,
        private renderer: Renderer2
    ) {
        this.robot = robot;
    }

    ngOnInit() {
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
        if(this.robot && !this.robot.userType) {
            this.robot.userType = this.userTypes[0].type;
        }
    }

    settingAvatar() {
        this.avatarModalRef = this.modalService.open(SettingAvatarComponent, {
            data: this.robot.avatar
        });
        this.avatarModalRef.didDisappear().subscribe(avatar => {
            if(avatar) {
                this.robot.avatar = avatar;
            }
        });
        // this.renderer.setStyle(
        //     this.avatarModalRef.container.elementRef.nativeElement.querySelector('.modal-dialog'),
        //     "width",
        //     "382px"
        // );
    }


    onSubmit() {
        if (!this.robot.robotId) {
            this.robotService.create(this.robot).subscribe(value => {
                Object.assign(this.robot, value);
                this.modalRef.close(this.robot);
            }, response  => {
                this.toastService.error(response.error.msg);
            }, () => {
                //加载关闭
            });
        } else {
            this.robotService.update(this.robot).subscribe(value => {
                this.modalRef.close(this.robot);
            }, response => {
                this.toastService.error(response.error.msg);
            })
        }
    }
}