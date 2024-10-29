import { Component, inject } from '@angular/core';
import { DarkModeService } from '../../shared/services/dark-mode.service';

@Component({
  selector: 'app-apple-inc',
  standalone: true,
  imports: [],
  templateUrl: './apple-inc.component.html',
  styleUrl: './apple-inc.component.css'
})
export class AppleIncComponent {

  darkModeService = inject(DarkModeService)
}
