
import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {RoomMgrComponent} from "./room-mgr.component";
import {ChatComponent} from "./chat.component";
import {RoomInfoComponent} from "./room-info.component";
import {FunctionalComponent} from "./functional.component";
import {IMUserComponent} from "./im-user.component";
import {RobotComponent} from "./robot.component";
import {ChatLogComponent} from "./chat-log.component";
import {RoomsResolve} from "./rooms.resolve";
import {RoomResolve} from "./room.resolve";
import {FunctionalResolve} from "./functional.resolve";
import {ContactComponent} from "./contact.component";
import {GossipComponent} from "../control/gossip.component";
import {BlankComponent} from "./blank.component";
import {RoomPlanComponent} from "./room-plan.component";
import {RoomNoticeComponent} from "./room-notice.component";

const routes: Routes = [
    {
        path: 'rooms',
        component: ChatComponent,
        resolve: {
            rooms: RoomsResolve,
        },
        children: [
            {
                path: '',
                component: BlankComponent,
                pathMatch:'full'
            },
            {
                path: ':roomNo',
                component: RoomMgrComponent,
                children: [
                    {
                        path: '',
                        redirectTo: 'info',
                        pathMatch: 'full'
                    },
                    {
                        path: 'info',
                        resolve: {
                            room: RoomResolve
                        },
                        component: RoomInfoComponent
                    },
                    {
                        path: 'functional',
                        resolve: {
                            functional: FunctionalResolve
                        },
                        component: FunctionalComponent
                    },
                    {
                        path: 'im-user',
                        component: IMUserComponent
                    },
                    {
                        path: 'contact',
                        component: ContactComponent
                    },
                    {
                        path: 'robot',
                        component: RobotComponent
                    },
                    {
                        path: 'chat-log',
                        component: ChatLogComponent
                    },
                    {
                        path: 'gossip',
                        component: GossipComponent
                    },
                    {
                        path: 'room-plan',
                        component: RoomPlanComponent
                    },
                    {
                        path: 'room-notice',
                        component: RoomNoticeComponent
                    }
                ]
            },
            // {
            //     path: 'staffs',
            //     component: StaffsComponent,
            //     data: {
            //         title: '员工管理'
            //     }
            // },
            //
            // {
            //     path: 'oplog',
            //     component: OplogComponent,
            //     data: {
            //         title: '操作日志'
            //     }
            // }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ChatRouteModule {

}