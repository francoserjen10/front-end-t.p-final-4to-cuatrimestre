import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DarkModeService } from './shared/services/dark-mode.service';
import { NavBarComponent } from './core/components/navBar/navBar.component';
import { SideBarComponent } from './core/components/sideBar/side-bar.component';
import { StockTickerComponent } from './core/components/ticker/stock-ticker.component';

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
