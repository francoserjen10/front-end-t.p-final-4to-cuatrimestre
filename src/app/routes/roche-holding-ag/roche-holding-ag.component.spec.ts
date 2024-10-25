import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RocheHoldingAgComponent } from './roche-holding-ag.component';

describe('RocheHoldingAgComponent', () => {
  let component: RocheHoldingAgComponent;
  let fixture: ComponentFixture<RocheHoldingAgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RocheHoldingAgComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RocheHoldingAgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
