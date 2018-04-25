export class IMUser {
    userId: number;
    nickname: string;
    avatar: string;
    personalSignature: string;

    gossip?: boolean;
    userType?: string;


    //    private String py 拼音缩写 和 全拼
    //省
    province: string;
    //城市
    city: string;


    //访问的IP
    ip: string;

    //操作系统
    operatingSystem: string;

    //访问主机
    host: string;

    //UserAgent
    userAgent: string;

    terminal: Terminal;
}

export enum Terminal {
    MOBILE = 'MOBILE',
    PC = 'PC'
}