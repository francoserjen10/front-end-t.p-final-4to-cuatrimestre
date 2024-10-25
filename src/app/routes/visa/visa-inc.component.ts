import { Component, inject } from '@angular/core';
import { DarkModeService } from '../../services/dark-mode.service';


@Component({
  selector: 'app-visa-inc',
  standalone: true,
  imports: [],
  templateUrl: './visa-inc.component.html',
  styleUrl: './visa-inc.component.css'
})
export class VisaIncComponent {

  darkModeService = inject(DarkModeService)
}
