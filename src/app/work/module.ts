
import {ModuleWithProviders, NgModule} from "@angular/core";
import {ToDoListComponent} from "./to-do-list.component";
import {WorkRouteModule} from "./route.module";
import {WorkService} from "./work.service";
import {SharedModule} from "../shared/shared.module";
import {ToDoModalComponent} from "./to-do-modal.component";

@NgModule({
    declarations: [ToDoListComponent, ToDoModalComponent],
    imports: [WorkRouteModule, SharedModule],
    entryComponents: [ToDoModalComponent]
})
export class WorkModule {
    static forRoot() : ModuleWithProviders{
        return {
            ngModule: WorkModule,
            providers: [
                WorkService
            ]
        }
    }
}