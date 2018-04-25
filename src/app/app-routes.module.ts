
import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";

const routes: Routes = [
    {
        path: '',
        redirectTo: 'user/profile',
        pathMatch: 'full'
    },
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, {
            useHash: true
        }
    )],
    exports: [RouterModule]
})
export class AppRoutesModule {

}