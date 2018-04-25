import {IMUser} from "../chat/im-user";

export class Cst extends IMUser{

    cstId: number;
    username: string;
    name?: string;
    qq?:number;
    phone?:number;
    weChat?:string;
    balance: number;
    lastOperationTime: number;
    createTime: number;
    status: UserType;

    referrer: string;
    popularizeCode: string;
    registerHost: string;
}

export enum UserType {
    Enable="Enable",
    Disable='Disable'
}

export class GagInfo {
    expireTime: number;
    reason: string;
}

export class EnableLoading {
    enableName: boolean = false;
    enableQQ: boolean = false;
    enableWeChat: boolean = false;
    enablePhone: boolean = false;
}
export class MoneyLoading {
    enablePhone: boolean = false;
}
export class ChatLoading {
    enableVisitorSpeech: boolean = false;
    enableOnlyStaffSpeech: boolean = false;
}

export class RegisterEnable {
    enableName: boolean;
    enableQQ: boolean;
    enableWeChat: boolean;
    enablePhone: boolean;
}

export class MoneyEnable {
    enablePhone: boolean;
    minMoney: number;
}

export class ChatEnable {
    enableVisitorSpeech: boolean;
    enableOnlyStaffSpeech: boolean;
    takeCustomerRate: string;
}