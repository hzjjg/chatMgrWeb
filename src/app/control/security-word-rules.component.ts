import {ToastService, ModalService, MessageBoxService, ModalRef} from "../rui";

import { Component, OnInit } from "@angular/core";
import {SimpleDataSource} from "../shared/material-utils";
import {SecurityWordRule} from "./security-word-rule";
import {SecurityWordRuleService} from "./security-word-rule.service";
import {SecurityWordRuleInfoComponent} from "./security-word-rule-info.component";

@Component({
    selector: 'security-word-rules',
    templateUrl: 'security-word-rules.component.html'
})
export class SecurityWordRulesComponent implements OnInit {
    displayedColumns = ['target', 'remark', 'createTime', 'operation'];
    dataSource: RestrictWordDataSource;

    constructor(
        private toastService: ToastService,
        private modalService: ModalService,
        private messageBoxService: MessageBoxService,
        private workRuleService: SecurityWordRuleService
    ) {
        this.dataSource = new RestrictWordDataSource();
    }
    ngOnInit() {
        this.workRuleService.getEntities().subscribe((entities) => {
            this.dataSource.data = entities;
        });
    }
    create() {
        let rule = new SecurityWordRule();
        const ref: ModalRef = this.modalService.open(SecurityWordRuleInfoComponent, {
            data: rule
        });
        ref.didDisappear().subscribe(rule => {
            if (rule) {
                this.dataSource.data = this.dataSource.data.concat(rule);
            }
        });
    }

    edit(row: SecurityWordRule) {
        const index = this.dataSource.data.indexOf(row);
        const ref: ModalRef = this.modalService.open(SecurityWordRuleInfoComponent, {
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

    remove(row: SecurityWordRule) {
        this.messageBoxService.confirm(`确认是否删除 "${row.remark}"`).handle.then(() => {
            this.workRuleService.delete(row.ruleId).subscribe(()=> {
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


export class RestrictWordDataSource extends SimpleDataSource<SecurityWordRule> {
    map(data: SecurityWordRule[], filter: any): SecurityWordRule[] {
        return data;
    }
}