import {Component, Inject} from "@angular/core";
import {MODAL_DATA} from "../../rui/packages/modal/modal.service";
import {ModalRef} from "../../rui/packages/modal/modal-ref";
import {Visitor} from "./visitor";

@Component({
    selector: 'visitor-info',
    templateUrl: 'visitor-info.component.html',
    styleUrls: ['./visitor-info.component.scss']
})

export class VisitorInfoComponent {
    visitor: Visitor;

    constructor(
        @Inject(MODAL_DATA) visitor: Visitor,
        public modalRef: ModalRef
    ) {
        this.visitor = visitor;
    }

    ngOnInit() {

    }
}