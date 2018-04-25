
import {ModuleWithProviders, NgModule} from "@angular/core";
import {SharedModule} from "../shared/shared.module";
import {OrganRouteModule} from "./route.module";
import {OrganComponent} from "./organ.component";
import {StaffsComponent} from "./staffs.component";
import {RolesComponent} from "./roles.component";
import {CorpComponent} from "./corp.component";
import {StaffService} from "./staff.service";
import {StaffInfoComponent} from "./staff-info.component";
import {RoleInfoComponent} from "./role-info.component";
import {RoleService} from "./role.service";
import {PermissionService} from "./permission.service";

@NgModule({
    declarations: [
        OrganComponent,
        CorpComponent,
        RolesComponent,
        RoleInfoComponent,
        StaffsComponent,
        StaffInfoComponent,
    ],
    imports: [
        SharedModule,
        OrganRouteModule
    ],
    exports: [
        OrganComponent,
        CorpComponent,
        StaffsComponent,
        RolesComponent,
    ],
    entryComponents: [
        StaffInfoComponent,
        RoleInfoComponent
    ]
})
export class OrganModule {
    static forRoot() : ModuleWithProviders{
        return {
            ngModule: OrganModule,
            providers: [StaffService, RoleService, PermissionService]
        }
    }
}