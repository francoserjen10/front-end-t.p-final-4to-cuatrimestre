import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-side-bar-home',
  standalone: true,
  imports: [RouterLink, TranslateModule],
  templateUrl: './side-bar-home.component.html',
  styleUrl: './side-bar-home.component.css'
})
export class SideBarHomeComponent {

  constructor() { }
}
