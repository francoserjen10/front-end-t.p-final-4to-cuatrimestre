import { Component, inject } from '@angular/core';
import { DarkModeService } from '../../services/dark-mode.service';

@Component({
  selector: 'app-jp-morgan-chase',
  standalone: true,
  imports: [],
  templateUrl: './jp-morgan-chase.component.html',
  styleUrl: './jp-morgan-chase.component.css'
})
export class JpMorganChaseComponent {

  darkModeService = inject(DarkModeService)
}
