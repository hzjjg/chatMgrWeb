
import {RouterModule, Routes} from "@angular/router";

import {NgModule} from "@angular/core";
import {OrganComponent, StaffsComponent} from "./index";
import {OpLogsComponent} from "../user/op-logs.component";

const routes: Routes = [
    {
        path: 'organ',
        component: OrganComponent,
        children: [
            {
                path: '',
                redirectTo: 'staffs',
                // redirectTo: 'corp',
                // pathMatch: 'prefix'
                pathMatch:'full'
            },
            // {
            //     path: 'corp',
            //     component: CorpComponent,
            //     data: {
            //         title: '公司信息'
            //     }
            // },
            {
                path: 'staffs',
                component: StaffsComponent,
                data: {
                    title: '员工管理'
                }
            },
            {
                path: 'op-logs',
                component: OpLogsComponent,
                data: {
                    user: 'all'
                }
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class OrganRouteModule {

}