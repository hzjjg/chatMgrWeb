import {Injectable} from "@angular/core";
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {ChatLog} from "./chat-log";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs/Observable";

@Injectable()
export class ChatLogService {

    private chatLogUrl = '/messages';

    private _chatLogs: BehaviorSubject<ChatLog[]>;

    constructor(
        private http: HttpClient
    ) {
        this._chatLogs = new BehaviorSubject<ChatLog[]>([])
    }

    get(options?: {
        params?: HttpParams;
    }): Observable<any> {
        return this.http.get(`${this.chatLogUrl}`, options)
    }

    delete(message: ChatLog): Observable<any> {
        return this.http.delete(`${this.chatLogUrl}/${message.msgId}`)

        // return Observable.of(
        //     [
        //         {
        //             appId: 1000,
        //             msgId: "5a118dc4c3c21c56150e1fac",
        //             msgType: "GroupTip",
        //             nickname: "稻感",
        //             time: 1511099844297,
        //             tipType: "JOIN",
        //             to: "1",
        //             total: 2,
        //             type: "GROUP",
        //             user: {userId: 339, appId: 1000, userType: "Customer", relationId: 9, nickname: "稻感"},
        //             userId: 339,
        //             userType: "Customer"
        //         },
        //         {
        //             appId: 1000,
        //             clientMsgId:  222811564,
        //             description: "恭喜发财，大吉大利",
        //             from: "339",
        //             fromAvatar: "/images/avatar/4.jpg",
        //             fromNick: "稻感",
        //             msgId: "5a118a84c3c21c4d4e463fc0",
        //             msgType: "RedPacket",
        //             packetId: 208,
        //             redPacketStatus: "Normal",
        //             time: 1511099012690,
        //             to: "1",
        //             token: "a5SDMhZh5Y",
        //             type: "GROUP"
        //         },
        //         {
        //             appId: 1000,
        //             clientMsgId: 222870692,
        //             content: "啊啊",
        //             displayTime: "21:59",
        //             from: "339",
        //             fromAvatar: "/images/avatar/4.jpg",
        //             fromNick: "稻感",
        //             msgId: "5a118e37c3c21c56150e1fb4",
        //             msgType: "Text",
        //             time: 1511099959161,
        //             to: "1",
        //             type: "GROUP"
        //         },
        //         {
        //             appId: 1000,
        //             clientMsgId: 222878516,
        //             content: "http://www.099609.com//upload/1000/83d49a9a-b838-410c-9863-286fa9fb7b91.jpg",
        //             displayTime: "22:01",
        //             from: "339",
        //             fromAvatar: "/images/avatar/4.jpg",
        //             fromNick: "稻感",
        //             msgId: "5a118eb4c3c21c56150e1fb5",
        //             msgType: "Image",
        //             time: 1511100084391,
        //             to: "1",
        //             type: "GROUP"
        //         }
        //     ]
        // ).delay(1000)
    }

    deleteBatch(roomNo: string, lowerTime: number): Observable<any> {
        let params: HttpParams = new HttpParams()
            .append("roomNo", roomNo)
            .append("lowerTime", lowerTime.toString());

        return this.http.delete(`${this.chatLogUrl}`, {
            params: params
        })
    }

}
