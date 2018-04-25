import {Component, Inject} from "@angular/core";
import {StaffService} from "../../organ/staff.service";
import {ModalRef} from "../../../rui/packages/modal/modal-ref";
import {MODAL_DATA} from "../../../rui/packages/modal/modal.service";
import {Staff} from "../../organ/staff";

@Component({
    selector: 'look-info',
    templateUrl: 'look-info.component.html',
    styleUrls: ['./look-info.component.scss']
})

export class LookInfoComponent {

    staff: Staff;
    staffId: any;
    constructor(
        private modalRef: ModalRef,
        private staffService: StaffService,
        @Inject(MODAL_DATA) staff: Staff
    ) {
        this.staff = staff;
    }

    ngOnInit() {
        // this.staffService.getStaff(this.staffId).subscribe((data: Staff) => {
        //     this.staff = data;
        //     console.log(data, 'data');
        // })
    }
}