export class Transaction {
    type: TransactionType;
    transferType: TransferType;
    relationId?: any;
    relationUsername: string;
    money: number;
    statement: string;
    time?: number;
}

export class RedPacketTransaction extends Transaction {
    packetId: number;
}

export class ConversionMoneyTransaction extends Transaction {
    staffId: number;
    remark: string;
    reason: string;
}

export class TransactionType {
    RedPacket='RedPacket';
    StaffAdjust='StaffAdjust';
    ConversionMoney='ConversionMoney';
}
export class TransferType {
    TO='TO';
    OUT='OUT';
}