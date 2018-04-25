
export class ChatLog {
    msgId?: string;
    type: string;
    msgType: string;
    from: string;
    fromNick?: string; //来源昵称 ，将由服务端填充
    fromAvatar?: string;
    to: string;
    seq: number;
    time: number;
    clientMsgId: number;

    //本地管理
    displayTime?: string;
    content: string
}