import { Component, OnInit } from '@angular/core';

import { EmployeeProviderService } from '../employee-provider.service';
import { Employee } from '../employee.model';

@Component({
    selector: 'app-employee-list',
    templateUrl: './employee-list.component.html',
    styleUrls: [
        './employee-list.component.scss'
    ]
})
export class EmployeeListComponent implements OnInit {
    public employeeList: Array<Employee>;

    constructor(private employeeProviderService: EmployeeProviderService) {}

    ngOnInit() {
        this.employeeList = this.employeeProviderService.getEmployeeList();

        this.employeeProviderService.employeeListChanged.subscribe((employeeList: Array<Employee>) => {
            this.employeeList = employeeList;
        });
    }
}
