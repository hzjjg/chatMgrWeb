
export enum RoomStatus {
    Open,
    Close
}

export class Room {
    roomNo: string;
    name: string;
    secret: boolean;
    icon: string;
    logo: string;
    logoHref: string;
    status: string;
    notices: NoticeTime[];
    closingNotice?: string;

    banner: string;
    bannerHref?: string;
    extensions?: Extension[];

    keywords?: string;
    description?: string;
    include?: string;

    guide?: string;
    visitorWarn?: string;
    visitorWarnTimeout?: number;
}

export class Extension {
    name: string;
    icon: string;
    color: string;
    description: string;
}

export class Notice {
    content: string;
    order: number;
    releaseDate: Date
}

export class NoticeTime {
    content: string;
    order: number;
    releaseTime: number
}

export class RoomPlan {
    planId: string;
    roomNo: string;

    code: string;
    name: string;
    template: string = '[plan]';
    script: string;

    newestTime?: string;
    newestContent?: string;

    lastPullTime?: number;
    createTime?: number;
    push?:boolean
}