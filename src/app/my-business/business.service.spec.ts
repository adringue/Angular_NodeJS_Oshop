import { TestBed, inject } from '@angular/core/testing';

import { BusinessService } from '../shared-business/services/business.service';

describe('BusinessService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BusinessService]
    });
  });

  it('should be created', inject([BusinessService], (service: BusinessService) => {
    expect(service).toBeTruthy();
  }));
});
