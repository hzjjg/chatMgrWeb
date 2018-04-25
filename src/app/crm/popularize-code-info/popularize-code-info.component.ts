import {Component, Inject} from "@angular/core";
import {MODAL_DATA, ModalRef} from "../../../rui/packages/modal";

@Component({
    selector: 'popularize-code',
    templateUrl: 'popularize-code-info.component.html'
})

export class PopularizeCodeInfoComponent {
    popularizeCode: string = 'xxx';
    popularizeHref: string;
    location: string = '域名';

    constructor(
        public modalRef: ModalRef
    ) {

    }

    ngOnInit() {
        this.codePopularize();
    }

    codePopularize() {
        if(this.location && this.popularizeCode) {
            this.popularizeHref = this.location + '?c=' + encodeURI(this.popularizeCode);
        } else if(this.location) {
            this.popularizeHref = this.location
        }
    }
}