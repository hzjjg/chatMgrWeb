

import {ModuleWithProviders, NgModule} from "@angular/core";
import {HTTP_INTERCEPTORS} from "@angular/common/http";
import {APIInterceptor} from "./api-interceptor";
import {SocketIO} from "./socket.io";
import {AudioService} from "./audio.service";

@NgModule({

})
export class SystemModule {
    static forRoot() : ModuleWithProviders {
        return {
            ngModule: SystemModule,
            providers: [
                { provide: HTTP_INTERCEPTORS, useClass: APIInterceptor, multi: true },
                SocketIO,
                AudioService,
            ]
        }
    }
}