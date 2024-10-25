import { Component, inject } from '@angular/core';
import { DarkModeService } from '../../services/dark-mode.service';

@Component({
  selector: 'app-roche-holding-ag',
  standalone: true,
  imports: [],
  templateUrl: './roche-holding-ag.component.html',
  styleUrl: './roche-holding-ag.component.css'
})
export class RocheHoldingAgComponent {

  darkModeService = inject(DarkModeService)
}
