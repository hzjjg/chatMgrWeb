import {Component, ElementRef, EventEmitter, OnInit, ViewChild} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import {Extension, Notice, Room} from "./room";
import {RoomService} from "./room.service";
import {ToastService} from "../../rui/packages/toast/toast.service";
import { UploadOutput, UploadInput } from "ngx-uploader";

@Component({
    selector: 'room-info',
    templateUrl: 'room-info.component.html',
    styleUrls:['room-info.component.scss']
})
export class RoomInfoComponent implements OnInit {
    room: Room;

    notices: Notice[];

    uploading: boolean = false;

    uploadInput: EventEmitter<any>;
    @ViewChild('fileUpload', undefined)
    fileUpload: ElementRef;

    constructor(
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private roomService: RoomService,
        private toastService: ToastService,
    ) {
        // this.room = new Room();
        this.uploadInput = new EventEmitter();
    }

    ngOnInit() {
        this.activatedRoute.data.subscribe((value) => {
            this.room = value.room;
            if(this.room && !this.room.extensions) {
                this.room.extensions = [];
            }
            if(this.room && this.room.notices) {
                this.notices = (this.room.notices || []).map((notice) => {
                    return {
                        order: notice.order,
                        content: notice.content,
                        releaseDate: new Date(notice.releaseTime)
                    }
                });
            } else {
                this.notices = [];
            }
        });
    }

    addNotice() {
        setTimeout(() => {
            let notice: Notice  = new Notice();
            this.notices.push(notice);
        })

    }
    deleteNotice(index: number) {
        this.notices.splice(index, 1);
    }

    addItem() {
        setTimeout(() => {
            let extension: Extension  = new Extension();
            this.room.extensions.push(extension);
        })
    }
    deleteItem(index: number) {
        this.room.extensions.splice(index, 1);
    }

    submit() {
        this.room.notices = (this.notices || []).map((notice) => {
            return {
                order: notice.order,
                content: notice.content,
                releaseTime: notice.releaseDate ? notice.releaseDate.getTime() : null
            }
        });
        this.roomService.update(this.room.roomNo, this.room).subscribe(() => {
            this.toastService.success("保存成功")
        }, (response) => {
            this.toastService.error(response.error.msg);
        });
    }

    deleteLogo() {
        delete this.room.logo;
    }

    onUploadOutputLogo(output: UploadOutput): void {
        this.uploading = true;
        if (output.type == 'allAddedToQueue') {
            const event: UploadInput = {
                type: 'uploadAll',
                url: '/api/file',
                method: 'POST',
                data: {}
            };
            this.fileUpload.nativeElement.value = null;

            this.uploadInput.emit(event);
        }

        if (output.type == 'done') {
            this.uploading = false;
            if (output.file.responseStatus == 200) {
                this.room.logo = output.file.response.url;
            } else {
                this.toastService.error('上传失败');
            }
        }
    }

    deleteHref() {
        delete this.room.banner;
    }

    onUploadOutput(output: UploadOutput): void {
        this.uploading = true;
        if (output.type == 'allAddedToQueue') {
            const event: UploadInput = {
                type: 'uploadAll',
                url: '/api/file',
                method: 'POST',
                data: {}
            };
            this.fileUpload.nativeElement.value = null;

            this.uploadInput.emit(event);
        }

        if (output.type == 'done') {
            this.uploading = false;
            if (output.file.responseStatus == 200) {
                this.room.banner = output.file.response.url;
            } else {
                this.toastService.error('上传失败');
            }
        }
    }
}