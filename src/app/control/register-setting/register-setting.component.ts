import {Component} from "@angular/core";
import {RegisterSettingService} from "./register-setting.service";
import {ToastService} from "../../../rui/packages/toast/toast.service";
import {ChatEnable, ChatLoading, EnableLoading, MoneyEnable, MoneyLoading, RegisterEnable} from "../../crm/cst";
import {Observable} from "rxjs/Observable";

@Component({
    selector: 'register-setting',
    templateUrl: 'register-setting.component.html'
})

export class RegisterSettingComponent {
    registerEnable: RegisterEnable;
    moneyEnable: MoneyEnable;
    chatEnable: ChatEnable;

    registerLoading: EnableLoading;
    moneyLoading: MoneyLoading;
    chatLoading: ChatLoading;
    loading: boolean = false;
    saveMinMoneyLoading: boolean = false;
    saveRateLoading: boolean = false;

    constructor(
        private registerSettingService: RegisterSettingService,
        private toastService: ToastService
    ) {

    }

    ngOnInit() {
        this.loading = true;
        Observable.forkJoin(
            this.registerSettingService.get(),
            this.registerSettingService.getMoney(),
            this.registerSettingService.getChat()
        ).subscribe((result) => {
            this.loading = false;
            const registerEnable = result[0];
            const moneyEnable = result[1];
            const chatEnable = result[2];

            this.registerEnable = registerEnable;
            this.moneyEnable = moneyEnable;
            this.chatEnable = chatEnable;
        }, (res) => {
            this.loading = false;
            this.toastService.error(res.error.msg);
        });
        this.registerLoading = new EnableLoading();
        this.moneyLoading = new MoneyLoading();
        this.chatLoading = new ChatLoading();
    }

    toggleEnable(name: string, type: string) {
        const params: any = {};

        // setTimeout(() => {
        //     this.saveLoading.enableName = true;
        // }, 1000);
        if(type == 'money') {
            params[name] = this.moneyEnable[name];
            this.moneyLoading[name] = true;
            this.registerSettingService.patchMoney(params).subscribe(() => {
                this.toastService.success('保存成功!');
            }, (res) => {
                this[name] = !params[name];
                this.toastService.error(res.error.msg);
            }, () => {
                this.moneyLoading[name] = false;

                // this.saveLoading.enableName = false;
            })
        } else if(type == 'chat') {
            params[name] = this.chatEnable[name];
            this.chatLoading[name] = true;
            this.registerSettingService.patchChat(params).subscribe(() => {
                this.toastService.success('保存成功!');
            }, (res) => {
                this[name] = !params[name];
                this.toastService.error(res.error.msg);
            }, () => {
                this.chatLoading[name] = false;
            })
        } else {
            params[name] = this.registerEnable[name];
            this.registerLoading[name] = true;
            this.registerSettingService.patch(params).subscribe(() => {
                this.toastService.success('保存成功!');
            }, (res) => {
                this[name] = !params[name];
                this.toastService.error(res.error.msg);
            }, () => {
                this.registerLoading[name] = false;

                // this.saveLoading.enableName = false;
            })
        }
    }

    saveMinMoney() {
        this.saveMinMoneyLoading = true;
        let params = {
            minMoney: this.moneyEnable.minMoney
        };
        this.registerSettingService.patchMoney(params).subscribe(() => {
            this.toastService.success('保存成功!')
        }, (res) => {
            this.toastService.error(res.error.msg);
        }, () => {
            this.saveMinMoneyLoading = false;
        })
    }
    saveRate() {
        this.saveRateLoading = true;
        let params = {
            takeCustomerRate: this.chatEnable.takeCustomerRate
        };
        this.registerSettingService.patchChat(params).subscribe(() => {
            this.toastService.success('保存成功!')
        }, (res) => {
            this.toastService.error(res.error.msg);
        }, () => {
            this.saveRateLoading = false;
        })
    }
}