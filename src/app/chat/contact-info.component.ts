import {Component, Inject} from "@angular/core";
import {ModalRef} from "../../rui/packages/modal/modal-ref";
import {MODAL_DATA} from "../../rui/packages/modal/modal.service";
import {Contact, ContactType} from "./contact";
import {ContactService} from "./contact.service";
import {ToastService} from "../../rui/packages/toast/toast.service";

@Component({
    selector: 'contact-info',
    templateUrl: 'contact-info.component.html'
})

export class ContactInfoComponent {
    contact: Contact;
    contactTypes: any[];

    constructor(
        @Inject(MODAL_DATA) contact: Contact,
        public modalRef: ModalRef,
        private contactService: ContactService,
        private toastService: ToastService
    ) {
        this.contact = contact;
    }

    ngOnInit() {
        this.contactTypes = [
            {
                type: 'QQ',
                name: 'QQ客服'
            },
            {
                type: 'ONLINE',
                name: '在线客服'
            }
        ];
        if(this.contact && !this.contact.type) {
            this.contact.type = this.contactTypes[0].type;
        }
    }

    submit() {
        if (!this.contact.contactId) {
            this.contactService.createContact(this.contact).subscribe(value => {
                Object.assign(this.contact, value);
                this.modalRef.close(this.contact);
            }, response  => {
                this.toastService.error(response.error.msg);
            }, () => {
                //加载关闭
            });
        } else {
            this.contactService.updateContact(this.contact).subscribe(value => {
                this.modalRef.close(this.contact);
            }, response => {
                this.toastService.error(response.error.msg);
            })
        }
    }
}