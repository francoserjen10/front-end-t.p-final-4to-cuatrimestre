import { Component, inject } from '@angular/core';
import { NavBarComponent } from '../../core/components/navBar/navBar.component';
import { SideBarComponent } from '../../core/components/sideBar/side-bar.component';
import { DarkModeService } from '../../shared/services/dark-mode.service';
import { CandlestickChartComponent } from '../../shared/candlestick-chart/candlestick-chart.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NavBarComponent, SideBarComponent, CandlestickChartComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  darkModeService = inject(DarkModeService)
}
