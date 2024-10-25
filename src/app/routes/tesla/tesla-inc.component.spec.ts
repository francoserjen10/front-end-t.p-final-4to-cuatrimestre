import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeslaIncComponent } from './tesla-inc.component';

describe('TeslaIncComponent', () => {
  let component: TeslaIncComponent;
  let fixture: ComponentFixture<TeslaIncComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TeslaIncComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TeslaIncComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
