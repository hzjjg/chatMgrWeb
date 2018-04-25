import {ModuleWithProviders, NgModule} from "@angular/core";

import { SidebarComponent } from "./sidebar.component";
import { HeaderComponent } from "./header.component";
import { BodyComponent } from "./body.component";
import { SharedModule } from "../shared/shared.module";

@NgModule({
    imports: [
        SharedModule
    ],
    exports: [
        HeaderComponent,
        SidebarComponent,
        BodyComponent
    ],
    declarations: [
        HeaderComponent,
        SidebarComponent,
        BodyComponent
    ],
})
export class ViewFrameworkModule {

    public static forRoot() : ModuleWithProviders {
        return {
            ngModule: ViewFrameworkModule,
        }
    }
}