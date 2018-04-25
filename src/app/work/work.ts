
export class Work {
    workId: string;
    type: string;
    cstId: number;
    username: string;
    createTime: number;
}

export class ConversionMoneyWork extends Work {
    money: number;
    status: WorkReviewStatus;
    reviewTime: number;
    reason: string;
    remark: string;
    account?:string;
}

export enum WorkReviewStatus {
    ADOPTED= 'Adopted', //允许
    REJECTED= 'Rejected', //拒绝
    WAITING= 'Waiting'   //待处理
}