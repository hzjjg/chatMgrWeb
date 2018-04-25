
import {ModuleWithProviders, NgModule} from "@angular/core";
import {SharedModule} from "../shared/shared.module";
import {CrmComponent} from "./crm.component";
import {CstsComponent} from "./csts.component";
import {VisitorsComponent} from "./visitors.component";
import {CrmRouteModule} from "./route.module";
import {CstService} from "./cst.service";
import {VisitorService} from "./visitor.service";
import {CstInfoComponent} from "./cst-info.component";
import {VisitorInfoComponent} from "./visitor-info.component";
import {TransferComponent} from "./transfer.component";
import {TransferRecordComponent} from "./transfer-record.component";
import {TransferService} from "./transfer.service";
import { ResetCstPasswordComponent } from "./reset-cst-password.component";
import {ChartsModule} from "ng2-charts";
import {AnalysisComponent} from "./analysis.component";
import {GagCreateComponent} from "./gag-create/gag-create.component";
import {GagAlertComponent} from "./gag-alert/gag-alert.component";
import {PopularizeCodeInfoComponent} from "./popularize-code-info/popularize-code-info.component";
@NgModule({
    declarations: [
        CrmComponent,
        CstsComponent,
        VisitorsComponent,
        CstInfoComponent,
        VisitorInfoComponent,
        TransferComponent,
        TransferRecordComponent,
        ResetCstPasswordComponent,
        AnalysisComponent,
        GagCreateComponent,
        GagAlertComponent,
        PopularizeCodeInfoComponent
    ],
    imports: [
        SharedModule,
        CrmRouteModule,
        ChartsModule
    ],
    entryComponents: [
        CstInfoComponent,
        VisitorInfoComponent,
        TransferComponent,
        TransferRecordComponent,
        ResetCstPasswordComponent,
        AnalysisComponent,
        GagCreateComponent,
        GagAlertComponent,
        PopularizeCodeInfoComponent
    ]
})
export class CrmModule {
    static forRoot() : ModuleWithProviders{
        return {
            ngModule: CrmModule,
            providers: [
                CstService,
                VisitorService,
                TransferService
            ]
        }
    }
}