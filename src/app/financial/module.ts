
import {ModuleWithProviders, NgModule} from "@angular/core";
import {TransactionsComponent} from "./transactions.component";
import {FinancialRouteModule} from "./route.module";
import {SharedModule} from "../shared/shared.module";
import {TransactionService} from "./transaction.service";
import {LookInfoComponent} from "./look-Info/look-info.component";
import {StaffService} from "../organ/staff.service";
import {LookInfoService} from "./look-Info/look-info.service";
import {RedPacketComponent} from "./red-packet/red-packet.component";
@NgModule({
    declarations: [
        TransactionsComponent,
        LookInfoComponent,
        RedPacketComponent
    ],
    imports: [
        SharedModule,
        FinancialRouteModule
    ],
    entryComponents: [
        LookInfoComponent,
        RedPacketComponent
    ]
})
export class FinancialModule {
    static forRoot() : ModuleWithProviders {
        return {
            ngModule: FinancialModule,
            providers: [
                TransactionService,
                StaffService,
                LookInfoService
            ]
        }
    }
}