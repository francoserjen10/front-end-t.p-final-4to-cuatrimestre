import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SideBarCotizacionesComponent } from './side-bar-cotizaciones.component';

describe('SideBarComponent', () => {
  let component: SideBarCotizacionesComponent;
  let fixture: ComponentFixture<SideBarCotizacionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SideBarCotizacionesComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(SideBarCotizacionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
