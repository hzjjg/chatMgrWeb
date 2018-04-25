export class Gossip {
    gagId?: any;
    userId?: number;
    userType?: string;
    relationId?: number;
    username?: string;
    reason: string;
    expireTime: number;
    createTime?: number;
}

export class EditGossip {
    gagId: any;
    userId?: number;
    userType?: string;
    relationId?: number;
    username?: string;
    reason: string;
    expireDate: Date;
    createDate: Date;
}