import { TestBed } from '@angular/core/testing';

import { HandleDateTimeValueService } from './handle-date-time-value.service';

describe('HandleDateTimeValueService', () => {
  let service: HandleDateTimeValueService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HandleDateTimeValueService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
