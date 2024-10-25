import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WalmartIncComponent } from './walmart-inc.component';

describe('WalmartIncComponent', () => {
  let component: WalmartIncComponent;
  let fixture: ComponentFixture<WalmartIncComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WalmartIncComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WalmartIncComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
