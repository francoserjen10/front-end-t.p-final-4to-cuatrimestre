import { Component, inject } from '@angular/core';
import { DarkModeService } from '../../services/dark-mode.service';

@Component({
  selector: 'app-walmart-inc',
  standalone: true,
  imports: [],
  templateUrl: './walmart-inc.component.html',
  styleUrl: './walmart-inc.component.css'
})
export class WalmartIncComponent {

  darkModeService = inject(DarkModeService)
}
