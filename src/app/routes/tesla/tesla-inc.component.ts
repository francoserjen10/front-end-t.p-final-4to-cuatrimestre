import { Component, inject } from '@angular/core';
import { DarkModeService } from '../../services/dark-mode.service';


@Component({
  selector: 'app-tesla-inc',
  standalone: true,
  imports: [],
  templateUrl: './tesla-inc.component.html',
  styleUrl: './tesla-inc.component.css'
})
export class TeslaIncComponent {

  darkModeService = inject(DarkModeService)
}
