import {Component, Inject, OnInit} from "@angular/core";
import {SecurityWordRule} from "./security-word-rule";
import {SecurityWordRuleService} from "./security-word-rule.service";
import {ToastService, ModalRef, MODAL_DATA} from "../rui";

@Component({
    selector: 'security-word-rule-info',
    templateUrl: 'security-word-rule-info.component.html'
})
export class SecurityWordRuleInfoComponent implements OnInit {
    viewModel: SecurityWordRule;
    constructor(
        @Inject(MODAL_DATA) viewModel: SecurityWordRule,
        private wordRuleService: SecurityWordRuleService,
        public modalRef: ModalRef,
        private toastService: ToastService

    ) {
        this.viewModel = Object.assign({}, viewModel);
    }
    ngOnInit() {}

    submit() {
        if (!this.viewModel.ruleId) {
            this.wordRuleService.create(this.viewModel).subscribe(value => {
                Object.assign(this.viewModel, value);
                this.modalRef.close(this.viewModel);
            }, response => {
                this.toastService.error(response.error.msg);
            })
        } else {
            this.wordRuleService.update(this.viewModel).subscribe(value => {
                this.modalRef.close(this.viewModel);
            }, response => {
                this.toastService.error(response.error.msg);
            })
        }
    }
}