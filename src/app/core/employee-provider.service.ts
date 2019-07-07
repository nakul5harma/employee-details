import { Injectable } from '@angular/core';

import { Subject } from 'rxjs';

import { Employee } from './employee.model';

@Injectable()
export class EmployeeProviderService {
    private employeeList: Array<Employee> = [
        new Employee(
            'Nakul Sharma',
            'nakul@example.com',
            8888888888,
            '+91',
            'Mphasis Ltd.',
            'Software Developer',
            'Chennai',
            50000
        ),
        new Employee(
            'Nakul Sharma',
            'nakul@example.com',
            8888888888,
            '+91',
            'Mphasis Ltd.',
            'Software Developer',
            'Chennai',
            50000
        )
    ];
    public employeeListChanged: Subject<Array<Employee>> = new Subject();

    constructor() {}

    public getEmployeeList() {
        return this.employeeList.slice();
    }

    public addEmployee(employee: Employee) {
        this.employeeList.push(employee);
        this.employeeListChanged.next(this.employeeList.slice());
    }
}
