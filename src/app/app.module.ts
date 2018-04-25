import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { APP_BASE_HREF, CommonModule } from "@angular/common";
import { AppComponent } from "./app.component";
import { ViewFrameworkModule } from "./framework/module";
import { UserModule } from "./user/module";
import { OrganModule } from "./organ/module";
import { ControlModule } from "./control/module";
import { ChatModule } from "./chat/module";
import { HttpClientModule } from "@angular/common/http";
import { CrmModule } from "./crm/module";
import { FinancialModule } from "./financial/module";
import { WorkModule } from "./work/module";


@NgModule({
    providers: [
        { provide: APP_BASE_HREF, useValue: '/' },
    ],
    imports: [
        BrowserModule,
        CommonModule,
        HttpClientModule,

        ViewFrameworkModule.forRoot(),
        UserModule.forRoot(),
        OrganModule.forRoot(),
        ControlModule.forRoot(),
        ChatModule.forRoot(),
        CrmModule.forRoot(),
        WorkModule.forRoot(),
        FinancialModule.forRoot()
    ],
    exports: [
    ],
    declarations: [AppComponent],
    bootstrap: [AppComponent]
})
export class AppModule { }