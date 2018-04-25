import {Component, Inject} from "@angular/core";
import {MODAL_DATA} from "../../rui/packages/modal/modal.service";
import {ModalRef} from "../../rui/packages/modal/modal-ref";

@Component({
    selector: 'room-plan-content',
    templateUrl: 'room-plan-content.component.html'
})

export class RoomPlanContentComponent {

    content: string;
    constructor(
        @Inject(MODAL_DATA) content: string,
        public modalRef: ModalRef
    ) {
        this.content = content;
    }

    ngOnInit() {

    }
}