import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartIndiceComponent } from './chart-indice.component';

describe('ChartIndiceComponent', () => {
  let component: ChartIndiceComponent;
  let fixture: ComponentFixture<ChartIndiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChartIndiceComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ChartIndiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
