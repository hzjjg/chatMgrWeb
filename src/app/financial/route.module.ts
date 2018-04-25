
import {TransactionsComponent} from "./transactions.component";
import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
const routes: Routes = [
    {
        path: 'financial',
        component: TransactionsComponent
    }
];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class FinancialRouteModule {

}