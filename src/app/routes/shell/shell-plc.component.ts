import { Component, inject } from '@angular/core';
import { DarkModeService } from '../../shared/services/dark-mode.service';


@Component({
  selector: 'app-shell-plc',
  standalone: true,
  imports: [],
  templateUrl: './shell-plc.component.html',
  styleUrl: './shell-plc.component.css'
})
export class ShellPlcComponent {

  darkModeService = inject(DarkModeService)

}
