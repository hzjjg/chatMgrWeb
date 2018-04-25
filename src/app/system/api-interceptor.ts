import {Injectable} from "@angular/core";
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs/Observable";

@Injectable()
export class APIInterceptor implements HttpInterceptor {
    constructor() {
    }
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const cloneRequest = req.clone({
            url: "/api" + req.url
        });
        return next.handle(cloneRequest).catch((err: any, caught: Observable<any>) => {
            if (err instanceof HttpErrorResponse) {
                let response: HttpErrorResponse = err;
                if (response.status == 401) {
                    // window.location.href = '/sso/login';
                }

                let contentType = response.headers.get("content-type");
                if (contentType && ~contentType.indexOf("application/json")) {
                    // if (response.status == 401) {
                    // console.log("需要login");
                    // window.location.href = '/login';
                    // }
                    err = new HttpErrorResponse({
                        // The error in this case is the response body (error from the server).
                        error: response.error, //JSON.parse(),
                        headers: response.headers,
                        status: response.status,
                        statusText: response.statusText,
                        url: response.url,
                    });
                    //或继续 throw err;
                    return Observable.throw(err);
                } else {
                    // console.log()
                    // this.toastService.error("服务繁忙!");
                    err = new HttpErrorResponse({
                        // The error in this case is the response body (error from the server).
                        error: {
                            code: -1,
                            msg: response.error
                        },
                        headers: response.headers,
                        status: response.status,
                        statusText: response.statusText,
                        url: response.url,
                    });
                    return Observable.throw(err);
                }
            }
            // return caught;
            return Observable.throw(err);
        })
    }

}