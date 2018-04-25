import { Component, OnInit, Inject } from '@angular/core';
import { ModalRef } from '../../rui/packages/modal/modal-ref';
import { MODAL_DATA } from '../../rui/packages/modal/modal.service';

@Component({
    selector: 'user-agent',
    template: `
                <div class="modal-header">
                    <h5 class="modal-title">User Agent</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true" (click)="close()" >&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <p>{{agent}}</p>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" (click)="close()" >关闭</button>
                </div>
                `,
    styleUrls:['user-agent.component.scss']
})

export class UserAgentComponent implements OnInit {
    agent: string;
    constructor(
        @Inject(MODAL_DATA) agent: string,
        private modalRef: ModalRef,
    ) {
        this.agent = agent;
    }

    ngOnInit() {
    }

    close(){
        this.modalRef.close()
    }
}