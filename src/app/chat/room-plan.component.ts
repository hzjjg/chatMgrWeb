import {Component} from "@angular/core";
import {RoomPlan} from "./room";
import {RoomPlanService} from "./room-plan.service";
import {ActivatedRoute} from "@angular/router";
import {SimpleDataSource} from "../shared/material-utils";
import {MessageBoxService} from "../../rui/packages/message-box/message-box.service";
import {ToastService} from "../../rui/packages/toast/toast.service";
import {ModalService} from "../../rui/packages/modal/modal.service";
import {RoomPlanInfoComponent} from "./room-plan-info.component";
import {ModalRef} from "../../rui/packages/modal/modal-ref";
import {RoomPlanContentComponent} from "./room-plan-content.component";

@Component({
    selector: 'room-plan',
    templateUrl: 'room-plan.component.html',
    styleUrls: ['./room-plan.component.scss']
})

export class RoomPlanComponent {
    roomNo: string;
    displayedColumns = ['name', 'code', 'newestTime', 'lastPullTime', 'createTime', 'operation'];
    // roomPlans: RoomPlan[];

    dataSource: RoomPlanDataSource;

    constructor(
        private roomPlanService: RoomPlanService,
        private activatedRoute: ActivatedRoute,
        private messageBoxService: MessageBoxService,
        private toastService: ToastService,
        private modalService: ModalService,
        // private modalRef:ModalRef,
    ) {
        this.dataSource = new RoomPlanDataSource();
    }

    ngOnInit() {
        this.roomNo = this.activatedRoute.parent.snapshot.params.roomNo;
        this.roomPlanService.get(this.roomNo).subscribe((roomPlans: RoomPlan[]) => {
            this.dataSource.data = roomPlans;
        })
    }

    createRoomPlan() {
        const roomPlan = new RoomPlan();
        roomPlan.roomNo = this.roomNo;
        const ref: ModalRef = this.modalService.open(RoomPlanInfoComponent, {
            data: roomPlan
        });
        ref.didDisappear().subscribe(roomPlan => {
            if (roomPlan) {
                this.dataSource.data = this.dataSource.data.concat(roomPlan);
            }
        });
    }

    editItem(row: RoomPlan) {
        const ref: ModalRef = this.modalService.open(RoomPlanInfoComponent, {
            data: Object.assign({}, row)
        });
        const index = this.dataSource.data.indexOf(row);
        ref.didDisappear().subscribe(roomPlan => {
            if (roomPlan) {
                // this.dataSource.data = this.dataSource.data.concat(roomPlan);
                let data = this.dataSource.data.slice();
                data.splice(index, 1, roomPlan);
                this.dataSource.data = data;
            }
        });
    }
    deleteItem(row: RoomPlan) {
        this.messageBoxService.confirm(`确认是否删除 "${row.code}"`)
            .handle.then(() => {
            this.roomPlanService.delete(row.planId).subscribe(() => {
                this.dataSource.data = this.dataSource.data.filter(value => {
                    return value.planId != row.planId;
                });
                this.toastService.show({
                    message: '删除成功',
                    type: 'success',
                    position: 'top'
                })
            })
        })
    }

    openNewestContent(content: string) {
        const ref: ModalRef = this.modalService.open(RoomPlanContentComponent, {
            data: content
        })
    }
}

export class RoomPlanDataSource extends SimpleDataSource<RoomPlan> {
    map(data: RoomPlan[], filter: any): RoomPlan[] {
        return data.filter(value => {
            return !filter || value.planId == filter;
        })
    }
}