import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DarkModeService } from './models/services/dark-mode.service';
import { NavBarComponent } from './components/navBar/navBar.component';
import { SideBarComponent } from './components/sideBar/side-bar.component';
import { StockTickerComponent } from './components/ticker/stock-ticker.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavBarComponent, SideBarComponent, StockTickerComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'bolsa-Noruega';

  darkModeService = inject(DarkModeService)
}
