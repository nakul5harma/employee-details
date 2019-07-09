import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

import { LocationProviderService } from '../location-provider.service';
import { Employee } from '../employee.model';

@Component({
    selector: 'app-employee-details',
    templateUrl: './employee-details.component.html',
    styleUrls: [
        './employee-details.component.scss'
    ]
})
export class EmployeeDetailsComponent implements OnInit {
    public employeeDetailForm: FormGroup;

    constructor(
        public dialogRef: MatDialogRef<EmployeeDetailsComponent>,
        private locationProviderService: LocationProviderService
    ) {}

    ngOnInit() {
        this.initForm(new Employee('', '', null, '', '', '', '', null));

        this.locationProviderService.getPosition().then(
            (pos) => {
                this.locationProviderService.getCountryCode(pos.lat, pos.lng).subscribe(
                    (countryCode) => {
                        this.locationProviderService.getCountryDialCode(countryCode).subscribe(
                            (dialCode: string) => {
                                this.employeeDetailForm.controls.dialCode.setValue(dialCode);
                            },
                            (error) => {
                                console.log('error occured while fetching country dial code!');
                            }
                        );
                    },
                    (error) => {
                        console.log('error occured while fetching country code!');
                    }
                );
            },
            (error) => {
                console.log(' Error : ' + JSON.stringify(error));
            }
        );
    }

    private initForm(employee: Employee) {
        this.employeeDetailForm = new FormGroup({
            name: new FormControl(employee.name, [
                Validators.required
            ]),
            email: new FormControl(employee.email, [
                Validators.required,
                Validators.email
            ]),
            phone: new FormControl(employee.phone, [
                Validators.required,
                Validators.pattern(/^\d{10}$/g),
                Validators.maxLength(10)
            ]),
            dialCode: new FormControl(employee.dialCode),
            company: new FormControl(employee.company),
            jobRole: new FormControl(employee.jobRole, [
                Validators.maxLength(50)
            ]),
            address: new FormControl(employee.address, [
                Validators.maxLength(200)
            ]),
            salary: new FormControl(employee.salary)
        });
    }

    public onSave() {
        this.dialogRef.close(this.employeeDetailForm.value);
    }

    public onCancel() {
        this.dialogRef.close(null);
    }
}
