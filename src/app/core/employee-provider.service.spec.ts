import { TestBed } from '@angular/core/testing';

import { EmployeeProviderService } from './employee-provider.service';

describe('EmployeeProviderService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EmployeeProviderService = TestBed.get(EmployeeProviderService);
    expect(service).toBeTruthy();
  });
});
