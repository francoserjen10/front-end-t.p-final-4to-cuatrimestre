import { Component, inject } from '@angular/core';
import { DarkModeService } from '../../../shared/services/dark-mode.service';

@Component({
  selector: 'app-navBar',
  standalone: true,
  imports: [],
  templateUrl: './navBar.component.html',
  styleUrl: './navBar.component.css'
})
export class NavBarComponent {

  darkModeService = inject(DarkModeService)

  constructor() { }

  toggleDarkMode() {
    this.darkModeService.updateDarkMode();
  }

}
