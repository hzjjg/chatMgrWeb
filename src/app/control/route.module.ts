import {RouterModule, Routes} from "@angular/router";

import {NgModule} from "@angular/core";
import {ControlComponent} from "./index";
import {SecurityWordRulesComponent} from "./security-word-rules.component";
import {SecurityGroupRulesComponent} from "./security-group-rules.component";
import {GossipComponent} from "./gossip.component";
import {RegisterSettingComponent} from "./register-setting/register-setting.component";

const routes: Routes = [
    {
        path: 'control',
        component: ControlComponent,
        children: [
            {
                path: '',
                redirectTo: 'security-group-rules',
                // redirectTo: 'corp',
                // pathMatch: 'prefix'
                pathMatch:'full'
            },
            {
                path: 'security-group-rules',
                component: SecurityGroupRulesComponent,
            },
            {
                path: 'security-word-rules',
                component: SecurityWordRulesComponent,
            },
            {
                path: 'gossip',
                component: GossipComponent
            },
            {
                path: 'register',
                component: RegisterSettingComponent
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