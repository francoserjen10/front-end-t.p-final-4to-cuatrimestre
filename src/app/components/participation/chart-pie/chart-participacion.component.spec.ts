import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ChartParticipacionComponent } from './chart-participacion.component';


describe('ChartParticipacionComponent', () => {
  let component: ChartParticipacionComponent;
  let fixture: ComponentFixture<ChartParticipacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChartParticipacionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ChartParticipacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
