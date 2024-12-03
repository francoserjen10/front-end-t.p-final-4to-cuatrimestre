import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-side-bar-home',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './side-bar-home.component.html',
  styleUrl: './side-bar-home.component.css'
})
export class SideBarHomeComponent {

  constructor() { }
}
