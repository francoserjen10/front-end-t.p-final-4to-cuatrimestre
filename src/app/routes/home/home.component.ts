import { Component, inject } from '@angular/core';
import { NavBarComponent } from './navBar/navBar.component';
import { SideBarComponent } from './sideBar/side-bar.component';
import { DarkModeService } from '../../services/dark-mode.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NavBarComponent, SideBarComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  darkModeService = inject(DarkModeService)
}
