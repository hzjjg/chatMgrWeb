import { Injectable } from '@angular/core';
import {Observable} from "rxjs/Observable";
import {Subject} from "rxjs/Subject";

@Injectable()
export class AudioService {
    private audioEle:HTMLAudioElement;

    private playSubject: Subject<void>;
    constructor() { 
        this.audioEle = document.createElement('audio');
        // this.audioEle.setAttribute('loop', 'loop');
        this.audioEle.setAttribute('volume', '1');
        this.audioEle.innerHTML = `<source src="/resources/sounds/ding.wav">`;


        this.playSubject = new Subject<void>();
        this.playSubject.throttleTime(2000).subscribe(() => {
            // console.log("play1");
            this.audioEle.play();
        })
    }

    play(){
        // console.log("play");
        this.playSubject.next();
    }
}