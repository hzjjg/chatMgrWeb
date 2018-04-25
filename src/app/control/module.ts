
import {ModuleWithProviders, NgModule} from "@angular/core";
import {SharedModule} from "../shared/shared.module";
import {OrganRouteModule} from "./route.module";
import {ControlComponent} from "./control.component";
import {SecurityWordRulesComponent} from "./security-word-rules.component";
import {SecurityGroupRuleService} from "./security-group-rule.service";
import {SecurityWordRuleService} from "./security-word-rule.service";
import {SecurityGroupRulesComponent} from "./security-group-rules.component";
import {SecurityGroupRuleInfoComponent} from "./security-group-rule-info.component";
import {SecurityWordRuleInfoComponent} from "./security-word-rule-info.component";
import {GossipComponent} from "./gossip.component";
import {GossipService} from "./gossip.service";
import {GagInfoComponent} from "./gag-info/gag-info.component";
import {RegisterSettingComponent} from "./register-setting/register-setting.component";
import {RegisterSettingService} from "./register-setting/register-setting.service";

@NgModule({
    declarations: [
        ControlComponent,
        SecurityGroupRulesComponent,
        SecurityWordRulesComponent,
        SecurityGroupRuleInfoComponent,
        SecurityWordRuleInfoComponent,
        GossipComponent,
        GagInfoComponent,
        RegisterSettingComponent
    ],
    imports: [
        SharedModule,
        OrganRouteModule
    ],
    exports: [
        ControlComponent,
        SecurityGroupRulesComponent,
        SecurityWordRulesComponent,
        GossipComponent,
        RegisterSettingComponent
    ],
    entryComponents: [
        SecurityGroupRuleInfoComponent,
        SecurityWordRuleInfoComponent,
        GagInfoComponent
    ]
})
export class ControlModule {
    static forRoot() : ModuleWithProviders{
        return {
            ngModule: ControlModule,
            providers: [
                SecurityGroupRuleService,
                SecurityWordRuleService,
                GossipService,
                RegisterSettingService
            ]
        }
    }
}