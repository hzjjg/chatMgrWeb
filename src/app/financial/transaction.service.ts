

import {Injectable} from "@angular/core";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs/Observable";
@Injectable()
export class TransactionService {

    private entityUrl = '/transactions';
    constructor(
        private httpClient: HttpClient
    ) {
    }


    getPage(options?: {
        params?: HttpParams;
    }): Observable<any> {
        return this.httpClient.get(`${this.entityUrl}`, options);
    }

    get(entityId: number): Observable<any> {
        return this.httpClient.get(`${this.entityUrl}/${entityId}`)
    }

    redPacket(packetId: any) {
        return this.httpClient.get(`/red-packet/${packetId}`);

        // return Observable.of(
        //     {
        //         allots: [
        //             {userId: 1588, nickname: "伊水", avatar: "/images/avatar/8.jpg", time: 1514557863778, money: 4.08},
        //             {userId: 1609, nickname: "吴雨", avatar: "/images/avatar/11.jpg", time: 1514557863873, money: 3.12},
        //             {userId: 1595, nickname: "轻歌曼舞", avatar: "/images/avatar/11.jpg", time: 1514557863947, money: 7.62},
        //             {userId: 1613, nickname: "任莹莹", avatar: "/images/avatar/12.jpg", time: 1514557865424, money: 0.87},
        //             {userId: 1578, nickname: "用户4325", avatar: "/images/avatar/0.jpg", time: 1514557876592, money: 4.31}
        //         ],
        //
        //         amount:20,
        //         balance:0,
        //         count:5,
        //         description:"恭喜发财，大吉大利",
        //         from: "876",
        //         fromAvatar:"http://www.099609.com/upload//1000/730cefed-df76-457c-bf5d-3ebe204becec",
        //         fromNick:"客服",
        //         packetId:433,
        //         remain:0,
        //         token:"waa3mIyfBz"
        //     }
        // ).delay(1000)
    }
}