import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavBarComponent } from './components/navBar/navBar.component';
import { StockTickerComponent } from './components/ticker/stock-ticker.component';
import { SideBarHomeComponent } from './components/sideBar/side-bar-home.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavBarComponent, StockTickerComponent, SideBarHomeComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'bolsa-Noruega';
}
