import { TestBed } from '@angular/core/testing';

import { OperativePlanService } from './operative-plan.service';

describe('OperativePlanService', () => {
  let service: OperativePlanService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OperativePlanService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
