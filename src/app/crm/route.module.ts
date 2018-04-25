
import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {CrmComponent} from "./crm.component";
import {CstsComponent} from "./csts.component";
import {VisitorsComponent} from "./visitors.component";
import {AnalysisComponent} from "./analysis.component";

const routes: Routes = [
    {
        path: 'crm',
        component: CrmComponent,
        children: [
            {
                path: '',
                redirectTo: 'csts',
                pathMatch:'full'
            },
            {
                path: 'csts',
                component: CstsComponent,
            },
            {
                path: 'visitors',
                component: VisitorsComponent,
            },
            {
                path: 'analysis',
                component: AnalysisComponent,
            }
            // {
            //     path: 'staffs',
            //     component: StaffsComponent,
            //     data: {
            //         title: '员工管理'
            //     }
            // },
            //
            // {
            //     path: 'oplog',
            //     component: OplogComponent,
            //     data: {
            //         title: '操作日志'
            //     }
            // }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CrmRouteModule {

}