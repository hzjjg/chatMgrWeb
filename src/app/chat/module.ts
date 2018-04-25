

import { ModuleWithProviders, NgModule } from "@angular/core";
import { ChatComponent } from "./chat.component";
import { ChatRouteModule } from "./route.module";
import { SharedModule } from "../shared/shared.module";
import { RoomService } from "./room.service";
import { RoomInfoComponent } from "./room-info.component";
import { RoomMgrComponent } from "./room-mgr.component";
import { RobotComponent } from "./robot.component";
import { FunctionalComponent } from "./functional.component";
import { IMUserComponent } from "./im-user.component";
import { ChatLogComponent } from "./chat-log.component";
import { RoomsResolve } from "./rooms.resolve";
import { RoomResolve } from "./room.resolve";
import { FunctionalResolve } from "./functional.resolve";
import { RobotService } from "./robot.service";
import { RobotInfoComponent } from "./robot-info.component";
import { SettingAvatarComponent } from "./setting-avatar.component";
import { ChatLogService } from "./chat-log.service";
import { ContactComponent } from "./contact.component";
import { ContactService } from "./contact.service";
import { ContactInfoComponent } from "./contact-info.component";
import { UserAgentComponent } from "./user-agent.component";
// import {GossipComponent} from "./gossip.component";
import {GossipService} from "../control/gossip.service";
import {BlankComponent} from "./blank.component";
import {RobotAutomaticComponent} from "./robot-automatic.component";
import {RoomPlanComponent} from "./room-plan.component";
import {RoomPlanService} from "./room-plan.service";
import {RoomPlanInfoComponent} from "./room-plan-info.component";
import {RoomNoticeComponent} from "./room-notice.component";
import {RoomNoticeService} from "./room-notice.service";
import {RoomPlanContentComponent} from "./room-plan-content.component";
import {AvatarCropperComponent} from "./avatar-cropper.component";
import {ImageCropperModule} from "ng2-img-cropper";

@NgModule({
    declarations: [
        ChatComponent,
        RoomMgrComponent,
        RoomInfoComponent,
        FunctionalComponent,
        IMUserComponent,
        BlankComponent,
        RobotComponent,
        ChatLogComponent,
        RobotInfoComponent,
        SettingAvatarComponent,
        ContactComponent,
        ContactInfoComponent,
        UserAgentComponent,
        RobotAutomaticComponent,
        RoomPlanComponent,
        RoomPlanInfoComponent,
        RoomNoticeComponent,
        RoomPlanContentComponent,
        AvatarCropperComponent
    ],
    imports: [SharedModule, ChatRouteModule, ImageCropperModule],
    exports: [],
    entryComponents: [
        RobotInfoComponent,
        SettingAvatarComponent,
        ContactInfoComponent,
        UserAgentComponent,
        RobotAutomaticComponent,
        RoomPlanInfoComponent,
        RoomPlanContentComponent,
        AvatarCropperComponent
    ]
})
export class ChatModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: ChatModule,
            providers: [
                RoomService,
                RoomsResolve,
                RoomResolve,
                FunctionalResolve,
                RobotService,
                ChatLogService,
                ContactService,
                GossipService,
                RoomPlanService,
                RoomNoticeService
            ]
        }
    }
}