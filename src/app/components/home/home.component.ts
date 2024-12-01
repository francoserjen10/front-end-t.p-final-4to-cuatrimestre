import { Component, inject } from '@angular/core';
import { DarkModeService } from '../../services/dark-mode.service';
import { SideBarHomeComponent } from './sideBar/side-bar-home.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [SideBarHomeComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  darkModeService = inject(DarkModeService);
}