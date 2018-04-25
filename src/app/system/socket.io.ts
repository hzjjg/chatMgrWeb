

import { Injectable, InjectionToken } from "@angular/core";
import { Subject } from "rxjs/Subject";
import { Cst } from "../crm/cst";

// import io from "socket.io-client";
let io = require('socket.io-client');

@Injectable()
export class SocketIO {
    socket: any;

    workSubject: Subject<void>;
    newCstSubject: Subject<Cst>;
    constructor() {
        this.workSubject = new Subject<void>();
        this.newCstSubject = new Subject();
    }

    public connect(url: string) {
        //https://github.com/socketio/socket.io-client/blob/HEAD/docs/API.md#managerreconnectiondelayvalue
        this.socket = io(url, {
            reconnectionDelay: 3000
        });
        this.initListeners();
    }
    private initListeners(): void {
        this.socket.on('connect', () => {
            console.log("connect");
        });

        this.socket.on('event', (data: any) => {
            console.log(data);
        });
        this.socket.on('work', (data: any) => {
            // console.log(data);
            this.workSubject.next();
        })

        this.socket.on('new_cst', (data: any) => {
            // console.log(data);
            
            this.newCstSubject.next(data)
        })

        this.socket.on('disconnect', () => {
            console.log("disconnect");
        });
    }


}