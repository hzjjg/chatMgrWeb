export class Robot {
    robotId?: number;  //(仅编辑需要)
    roomNo?:  string;  //(仅创建需要)
    userType: string;
    username?: string;
    nickname: string;
    avatar: string;
    personalSignature?: string;
    createTime?: number;
}

export class RobotType {
    Customer="Customer";
    Visitor='Visitor';
    Staff='Staff';
}