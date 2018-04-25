import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from "@angular/core";
import {Role} from "./role";

@Component({
    selector: 'roles',
    templateUrl: 'roles.component.html',
    styleUrls: ['roles.component.scss']
})
export class RolesComponent implements OnInit {

    @Input()
    roles: Role[];


    @Input("selected")
    selected: number | null;

    @Output("selectedChange")
    selectedEmitter: EventEmitter<Role> = new EventEmitter();

    @Output("onEdit")
    editEmitter: EventEmitter<Role> = new EventEmitter();
    @Output("onRemove")
    removeEmitter: EventEmitter<Role> = new EventEmitter();


    constructor(

    ) {
    }
    ngOnInit() {

    }

    // edit(role: Role) {
        // this.editEmitter.emit(role)
    // }


}