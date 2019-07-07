import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppMaterialModule } from '../app-material.module';

import { EmployeeProviderService } from './employee-provider.service';
import { LocationProviderService } from './location-provider.service';

import { HeaderComponent } from './header/header.component';
import { EmployeeDetailsComponent } from './employee-details/employee-details.component';
import { EmployeeDashboardComponent } from './employee-dashboard/employee-dashboard.component';
import { EmployeeListComponent } from './employee-list/employee-list.component';

@NgModule({
    declarations: [
        HeaderComponent,
        EmployeeDetailsComponent,
        EmployeeListComponent,
        EmployeeDashboardComponent
    ],
    imports: [
        CommonModule,
        HttpClientModule,
        ReactiveFormsModule,
        AppMaterialModule
    ],
    exports: [
        HeaderComponent,
        EmployeeDashboardComponent
    ],
    providers: [
        EmployeeProviderService,
        LocationProviderService
    ],
    entryComponents: [
        EmployeeDetailsComponent
    ]
})
export class CoreModule {}
