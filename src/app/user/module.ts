
import {ModuleWithProviders, NgModule} from "@angular/core";
import {UserComponent} from "./user.component";
import {SecurityComponent} from "./security.component";
import {ProfileComponent} from "./profile.component";
import {OpLogsComponent} from "./op-logs.component";
import {SharedModule} from "../shared/shared.module";
import {UserRouteModule} from "./route.module";
import {UserService} from "./user.service";
import {UserResolve} from "./user.resolve";
import {ModifyPwdComponent} from "./modify-pwd.component";
import {UserProfileResolve} from "./user-profile.resolve";
import {OpLogService} from "./op-log.service";

@NgModule({
    declarations: [
        UserComponent,
        SecurityComponent,
        ProfileComponent,
        OpLogsComponent,
        ModifyPwdComponent
    ],
    imports: [SharedModule, UserRouteModule],
    exports: [
        UserRouteModule,
        UserComponent,
        SecurityComponent,
        ProfileComponent,
        OpLogsComponent
    ],
    entryComponents: [
        ModifyPwdComponent
    ]
})
export class UserModule {
    static forRoot() : ModuleWithProviders{
        return {
            ngModule: UserModule,
            providers: [
                UserService,
                UserResolve,
                UserProfileResolve,
                OpLogService
            ]
        }
    }
}