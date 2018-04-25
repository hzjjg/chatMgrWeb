import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { UIModule } from "../../rui/index";
import { AppRoutesModule } from "../app-routes.module";
import { MatPaginatorModule, MatTableModule, MatTooltipModule, MatExpansionModule } from '@angular/material';
import { MatMenuModule } from '@angular/material/menu';
import { SystemModule } from "../system/module";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";
import { CustomMaterialModule } from "../custom-material.module";
import { NgUploaderModule } from 'ngx-uploader';
import { QuillModule } from 'ngx-quill'

@NgModule({
    imports: [
        CommonModule,
        SystemModule.forRoot(),
        AppRoutesModule,
        FormsModule,
        UIModule.forRoot(),
        MatTableModule,
        MatPaginatorModule,
        MatTooltipModule,
        MatMenuModule,
        MatExpansionModule,
        NoopAnimationsModule,
        CustomMaterialModule,
        NgUploaderModule,
        QuillModule

    ],
    exports: [
        CommonModule,
        SystemModule,
        AppRoutesModule,
        FormsModule,
        UIModule,
        MatTableModule,
        MatPaginatorModule,
        MatTooltipModule,
        MatMenuModule,
        MatExpansionModule,
        CustomMaterialModule,
        NgUploaderModule,
        QuillModule
    ],
    declarations: [],
    providers: []
})
export class SharedModule { }