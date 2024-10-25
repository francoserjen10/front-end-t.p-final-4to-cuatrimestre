import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisaIncComponent } from './visa-inc.component';

describe('VisaIncComponent', () => {
  let component: VisaIncComponent;
  let fixture: ComponentFixture<VisaIncComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VisaIncComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VisaIncComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
