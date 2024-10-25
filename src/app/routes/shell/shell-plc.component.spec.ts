import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShellPlcComponent } from './shell-plc.component';

describe('ShellPlcComponent', () => {
  let component: ShellPlcComponent;
  let fixture: ComponentFixture<ShellPlcComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShellPlcComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ShellPlcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
