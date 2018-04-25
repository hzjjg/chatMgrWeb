import {Component, Inject} from "@angular/core";
import {RoomPlan} from "./room";
import {RoomPlanService} from "./room-plan.service";
import {MODAL_DATA} from "../../rui/packages/modal/modal.service";
import {ModalRef} from "../../rui/packages/modal/modal-ref";
import {ToastService} from "../../rui/packages/toast/toast.service";

@Component({
    selector: 'room-plan-info',
    templateUrl: 'room-plan-info.component.html'
})

export class RoomPlanInfoComponent {
    roomPlan: RoomPlan;
    saveLoading: boolean = false;

    constructor(
        private roomPlanService: RoomPlanService,
        @Inject(MODAL_DATA) roomPlan: RoomPlan,
        public modalRef: ModalRef,
        private toastService: ToastService
    ) {
        this.roomPlan = roomPlan;
    }

    ngOnInit() {

    }

    submit() {
        // this.saveLoading = true;
        const params = this.roomPlan;
        if(params.planId) {
            this.roomPlanService.update(params).subscribe(value => {
                this.modalRef.close(params);
            }, response  => {
                this.toastService.error(response.error.msg);
            }, () => {
                // this.saveLoading = false;
            });
        } else {
            this.roomPlanService.create(params).subscribe(value => {
                Object.assign(params, value);
                this.modalRef.close(params);
            }, response  => {
                this.toastService.error(response.error.msg);
            }, () => {
                // this.saveLoading = false;
            });
        }
    }
}