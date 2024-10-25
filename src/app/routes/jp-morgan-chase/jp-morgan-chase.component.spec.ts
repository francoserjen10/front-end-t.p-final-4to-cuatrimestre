import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JpMorganChaseComponent } from './jp-morgan-chase.component';

describe('JpMorganChaseComponent', () => {
  let component: JpMorganChaseComponent;
  let fixture: ComponentFixture<JpMorganChaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JpMorganChaseComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(JpMorganChaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
