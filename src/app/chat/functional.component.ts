import { Component, OnInit } from "@angular/core";
import {RoomService} from "./room.service";
import {ActivatedRoute} from "@angular/router";
import {ToastService} from "../rui";
import {Functional} from "./functional";
import {RoomMenu} from "./room-menu";
import {RoomFunction} from "./room-function";
import { ModalRef } from "../../rui/packages/modal/modal-ref";

@Component({
    templateUrl: 'functional.component.html',
    styleUrls: ['functional.component.scss']
})
export class FunctionalComponent implements OnInit {
    roomNo: string;
    functional: Functional;


    constructor(
        private activatedRoute: ActivatedRoute,
        private roomService: RoomService,
        private toastService: ToastService
    ) {

    }
    ngOnInit() {
        this.roomNo = this.activatedRoute.parent.snapshot.params.roomNo;
        this.functional = this.activatedRoute.snapshot.data.functional;
        if (!this.functional.menus) {
            this.functional.menus = [];
        }
        if (!this.functional.functions) {
            this.functional.functions = [];
        }
    }

    toggleSupport(data: RoomFunction, type: string) {
        if(!data.support) {
            data.support = [];
        }
        let index = (data.support || []).findIndex((item) => {
            return item == type;
        });
        if(!~index) {
            data.support.push(type);
        } else  {
            data.support.splice(index, 1);
        }
    }

    addMenu() {
        this.functional.menus.push(new RoomMenu());
    }

    removeMenu(index: number) {
        this.functional.menus.splice(index, 1);
    }

    addFunction() {
        this.functional.functions.push(new RoomFunction());
    }

    removeFunction(index: number) {
        this.functional.functions.splice(index, 1);
    }


    submit() {
        this.roomService.updateFunctional(this.roomNo, this.functional).subscribe(() => {
            this.toastService.success("保存成功");
        }, (response) => {
            this.toastService.error(response.error.msg);
        });
    }
}