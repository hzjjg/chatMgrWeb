import { Component } from "@angular/core";
import {Contact} from "./contact";
import {ContactService} from "./contact.service";
import {ActivatedRoute} from "@angular/router";
import {SimpleDataSource} from "../shared/material-utils";
import {ModalService} from "../../rui/packages/modal/modal.service";
import {ContactInfoComponent} from "./contact-info.component";
import {ModalRef} from "../../rui/packages/modal/modal-ref";
import {MessageBoxService} from "../../rui/packages/message-box/message-box.service";
import {ToastService} from "../../rui/packages/toast/toast.service";

@Component({
    selector: 'contact',
    templateUrl: 'contact.component.html'
})

export class ContactComponent {
    roomNo: string;
    displayedColumns = ['name', 'type', 'url', 'operation'];
    contact: Contact[];
    dataSource: ContactDataSource;

    constructor(
        private contactService: ContactService,
        private activatedRoute: ActivatedRoute,
        private modalService: ModalService,
        private messageBoxService: MessageBoxService,
        private toastService: ToastService
    ) {
        this.dataSource = new ContactDataSource();
    }

    ngOnInit() {
        this.roomNo = this.activatedRoute.parent.snapshot.params.roomNo;
        this.contactService.getContact(this.roomNo).subscribe((contacts) => {
            this.dataSource.data = contacts;
        })
    }

    createContact() {
        let contact = new Contact();
        contact.roomNo = this.roomNo;
        const ref: ModalRef = this.modalService.open(ContactInfoComponent, {
            data: contact
        });
        ref.didDisappear().subscribe(contact => {
            if (contact) {
                this.dataSource.data = this.dataSource.data.concat(contact);
            }
        });
    }
    editContact(row: Contact) {
        const index = this.dataSource.data.indexOf(row);
        const ref: ModalRef = this.modalService.open(ContactInfoComponent, {
            data: Object.assign({}, row)
        });
        ref.didDisappear().subscribe(contact => {
            if (contact) {
                let data = this.dataSource.data.slice();
                data.splice(index, 1, contact);
                this.dataSource.data = data;
            }
        })
    }

    deleteContact(row: Contact) {
        this.messageBoxService.confirm(`确认是否删除 "${row.name}"`)
            .handle.then(() => {
            this.contactService.delete(row).subscribe(() => {
                this.dataSource.data = this.dataSource.data.filter(value => {
                    return value.contactId != row.contactId;
                });
                this.toastService.show({
                    message: '删除成功',
                    type: 'success',
                    position: 'top'
                })
            })
        })
    }
}

export class ContactDataSource extends SimpleDataSource<Contact> {
    map(data: Contact[], filter: any): Contact[] {
        return data.filter(value => {
            return !filter || value.contactId == filter;
        })
    }
}