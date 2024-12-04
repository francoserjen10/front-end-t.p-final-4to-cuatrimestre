import { TestBed } from '@angular/core/testing';

import { CotizacionesServiceService } from './cotizaciones-service.service';

describe('CotizacionesServiceService', () => {
  let service: CotizacionesServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CotizacionesServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
