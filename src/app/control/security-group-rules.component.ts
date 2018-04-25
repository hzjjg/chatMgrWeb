import { Component, OnInit } from "@angular/core";
import {SimpleDataSource} from "../shared/material-utils";
import {ToastService} from "../../rui/packages/toast/toast.service";
import {SecurityGroupRule} from "./security-group-rule";
import {ModalService} from "../../rui/packages/modal/modal.service";
import {ModalRef} from "../../rui/packages/modal/modal-ref";
import {MessageBoxService} from "../../rui/packages/message-box/message-box.service";
import {SecurityGroupRuleService} from "./security-group-rule.service";
import {SecurityGroupRuleInfoComponent} from "./security-group-rule-info.component";
import {SecurityWordRuleInfoComponent} from "./security-word-rule-info.component";

@Component({
    selector: 'security-group-rules',
    templateUrl: 'security-group-rules.component.html'
})
export class SecurityGroupRulesComponent implements OnInit {
    displayedColumns = ['target', 'remark', 'effectiveTime', 'createTime', 'operation'];
    dataSource: SecurityGroupRuleDataSource;

    constructor(
        private toastService: ToastService,
        private modalService: ModalService,
        private messageBoxService: MessageBoxService,
        private securityGroupRuleService: SecurityGroupRuleService
    ) {
        this.dataSource = new SecurityGroupRuleDataSource();
    }
    ngOnInit() {
        this.securityGroupRuleService.getEntities().subscribe(entities => {
            this.dataSource.data = entities;
        });
    }

    create() {
        let rule = new SecurityGroupRule();
        const ref: ModalRef = this.modalService.open(SecurityGroupRuleInfoComponent, {
            data: rule
        });
        ref.didDisappear().subscribe(rule => {
            if (rule) {
                this.dataSource.data = this.dataSource.data.concat(rule);
            }
        });
    }

    edit(row: SecurityGroupRule) {
        const index = this.dataSource.data.indexOf(row);
        const ref: ModalRef = this.modalService.open(SecurityGroupRuleInfoComponent, {
            data: row
        });
        ref.didDisappear().subscribe(rule => {
            if (rule) {
                let data = this.dataSource.data.slice();
                data.splice(index, 1, rule);
                this.dataSource.data = data;
            }
        })
    }

    remove(row: SecurityGroupRule) {
        this.messageBoxService.confirm(`确认是否删除 "${row.remark}"`).handle.then(() => {
            this.securityGroupRuleService.delete(row.ruleId).subscribe(()=> {
                this.dataSource.data = this.dataSource.data.filter(value => {
                    return value.ruleId != row.ruleId;
                });
                this.toastService.show({
                    message: '删除成功',
                    type: 'success',
                    position: 'top'
                })
            })
        });
    }
}

export class SecurityGroupRuleDataSource extends SimpleDataSource<SecurityGroupRule> {
    map(data: SecurityGroupRule[], filter: any): SecurityGroupRule[] {
        return data;
    }


}