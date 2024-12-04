import { TestBed } from '@angular/core/testing';

import { IndiceServiceService } from './indice-service.service';

describe('IndiceServiceService', () => {
  let service: IndiceServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IndiceServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
