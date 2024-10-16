import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavBarComponent } from './components/navBar/navBar.component';
import { DarkModeService } from './services/dark-mode.service';
import { SideBarComponent } from './components/sideBar/side-bar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavBarComponent, SideBarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'bolsa-Noruega';

  darkModeService = inject(DarkModeService)
}
