import {Component, Inject, OnInit} from "@angular/core";
import {SecurityGroupRule} from "./security-group-rule";
import {MODAL_DATA, ModalService} from "../../rui/packages/modal/modal.service";
import {SecurityGroupRuleService} from "./security-group-rule.service";
import {ModalRef} from "../../rui/packages/modal/modal-ref";
import {ToastService} from "../../rui/packages/toast/toast.service";

@Component({
    selector: 'security-group-rule',
    templateUrl: 'security-group-rule-info.component.html'
})
export class SecurityGroupRuleInfoComponent implements OnInit {

    viewModel: SecurityGroupRule;
    constructor(
        @Inject(MODAL_DATA) viewModel: SecurityGroupRule,
        private groupRuleService: SecurityGroupRuleService,
        public modalRef: ModalRef,
        private toastService: ToastService

    ) {
        this.viewModel = Object.assign({}, viewModel);
    }
    ngOnInit() {

    }

    submit() {
        if (!this.viewModel.ruleId) {
            this.groupRuleService.create(this.viewModel).subscribe(value => {
                Object.assign(this.viewModel, value);
                this.modalRef.close(this.viewModel);
            }, response => {
                this.toastService.error(response.error.msg);
            })
        } else {
            this.groupRuleService.update(this.viewModel).subscribe(value => {
                this.modalRef.close(this.viewModel);
            }, response => {
                this.toastService.error(response.error.msg);
            })
        }
    }
}