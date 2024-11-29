import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ChartCotizacionesComponent } from './chart-cotizaciones.component';

describe('ChartCotizacionesComponent', () => {
  let component: ChartCotizacionesComponent;
  let fixture: ComponentFixture<ChartCotizacionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChartCotizacionesComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ChartCotizacionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
