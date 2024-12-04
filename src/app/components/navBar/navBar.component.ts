import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-navBar',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './navBar.component.html',
  styleUrl: './navBar.component.css'
})
export class NavBarComponent {

  selectLenguage = [
    { value: 'es', name: 'Español' },
    { value: 'no', name: 'Noruego' },
  ];

  constructor(private translateService: TranslateService) { }

  changeLanguage(event: Event) {
    if (event.target) {
      const changeEvent = event.target as HTMLInputElement;
      this.translateService.use(changeEvent.value);
    }
  }
}
