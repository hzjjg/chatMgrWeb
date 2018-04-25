export class RedPacket {
    packetId: number;
    token: string;
    from: string;
    fromNick: string;
    fromAvatar: string;
    description: string;
    //分配个数
    count: number;  //发放数量
    remain: number; //剩余个数
    amount: number; //总金额
    balance: number; //剩余金额
    allots: RedPacketInfoAllot[]
}

export class RedPacketInfoAllot {
    userId: number;
    nickname: string;
    avatar: string;
    money: number;
    time: number;
}