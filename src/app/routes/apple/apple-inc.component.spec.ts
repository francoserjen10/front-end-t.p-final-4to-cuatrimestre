import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppleIncComponent } from './apple-inc.component';

describe('AppleIncComponent', () => {
  let component: AppleIncComponent;
  let fixture: ComponentFixture<AppleIncComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppleIncComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AppleIncComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
