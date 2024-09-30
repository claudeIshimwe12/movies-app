import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-home-icon',
  templateUrl: './home-icon.component.svg',
  styleUrl: './home-icon.component.scss',
})
export class HomeIconComponent {
  @Input({ required: true }) fill = '';
}
