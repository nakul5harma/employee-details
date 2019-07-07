import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { EmployeeProviderService } from '../employee-provider.service';
import { EmployeeDetailsComponent } from '../employee-details/employee-details.component';
import { Employee } from '../employee.model';

@Component({
    selector: 'app-employee-dashboard',
    templateUrl: './employee-dashboard.component.html',
    styleUrls: [
        './employee-dashboard.component.scss'
    ]
})
export class EmployeeDashboardComponent implements OnInit {
    constructor(private dialog: MatDialog, private employeeProviderService: EmployeeProviderService) {}

    ngOnInit() {}

    public addEmployee() {
        const dialogRef = this.dialog.open(EmployeeDetailsComponent, {
            disableClose: true,
            width: '700px'
        });

        dialogRef.afterClosed().subscribe((employee: Employee) => {
            if (employee) {
                this.employeeProviderService.addEmployee(employee);
            }
        });
    }
}
