
import {RouterModule, Routes} from "@angular/router";
import {UserComponent} from "./user.component";
import {ProfileComponent} from "./profile.component";
import {SecurityComponent} from "./security.component";
import {OpLogsComponent} from "./op-logs.component";
import {NgModule} from "@angular/core";
import {UserResolve} from "./user.resolve";
import {UserProfileResolve} from "./user-profile.resolve";

const routes: Routes = [
    {
        path: 'user',
        component: UserComponent,
        children: [
            {
                path: '',
                redirectTo: 'profile',
                // pathMatch: 'prefix'
                pathMatch:'full'
            },
            {
                path: 'profile',
                component: ProfileComponent,
                resolve: {
                    user: UserResolve,
                    profile: UserProfileResolve
                },
                // data: {
                //     title: '个人信息'
                // },
            },
            {
                path: 'security',
                component: SecurityComponent,
                data: {
                    title: '安全设置'
                }
            },
            {
                path: 'op-logs',
                component: OpLogsComponent,
                data: {
                    title: '操作日志'
                }
            }
        ]
    }
];


@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class UserRouteModule {

}