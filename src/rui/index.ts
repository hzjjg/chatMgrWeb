
import { ModuleWithProviders, NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { MessageBoxModule } from "./packages/message-box/module"
import { ModalModule } from "./packages/modal/module";
import { NavBarModule } from "./packages/nav-bar/module";
import { ButtonModule } from "./packages/button/module";
import { PickerModule } from "./packages/picker/module";
import { ToastModule } from "./packages/toast/module";
import { CollapseModule } from "./packages/collapse/module";

import { LoadingDirective } from "./packages/loading/loading.directive";

import { PickerComponent } from "./packages/picker/picker.component";
import { PickerService } from "./packages/picker/picker.service";

import { DocumentWrapper, WindowWrapper, DynamicService } from "./packages/shared/dynamic.service";
import {SelectModule} from "./packages/select/module";
import {NoticeModule} from "./packages/notice/notice.module";




export {
    ModalService,
    ModalRef,
    MODAL_DATA
} from './packages/modal';

export {
    MessageBoxService,
    MessageBoxComponent,
    MessageBoxContainerComponent
} from './packages/message-box';

export {
    PickerService,
    PickerComponent,
    PickerSolt
} from './packages/picker';

export {
    ToastService,
    ToastComponent
} from './packages/toast';

export {
    NavBarComponent
} from './packages/nav-bar';




export function getDocument(): any { return document }
export function getWindow(): any { return window }


@NgModule({
    declarations: [
        LoadingDirective,
    ],
    exports: [
        LoadingDirective,
        NavBarModule,
        ButtonModule,
        ModalModule,
        MessageBoxModule,
        PickerModule,
        NoticeModule,
        ToastModule,
        CollapseModule,
        SelectModule
    ],
    imports: [
        CommonModule,
        NavBarModule.forRoot(),
        ButtonModule.forRoot(),
        ModalModule.forRoot(),
        MessageBoxModule.forRoot(),
        PickerModule.forRoot(),
        NoticeModule.forRoot(),
        ToastModule.forRoot(),
        CollapseModule.forRoot()
    ],
    providers: [
        PickerService,
        DynamicService,
        {
            provide: DocumentWrapper,
            useFactory: getDocument
        },
        {
            provide: WindowWrapper,
            useFactory: getWindow
        },
    ],
})
export class UIModule {
    static forRoot(): ModuleWithProviders {
        return { ngModule: UIModule };
    }
}
