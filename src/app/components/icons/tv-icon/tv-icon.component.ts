import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-tv-icon',
  templateUrl: './tv-icon.component.svg',
  styleUrl: './tv-icon.component.scss',
})
export class TvIconComponent {
  @Input({ required: true }) fill = '';
}
