import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-movies-icon',
  templateUrl: './movies-icon.component.svg',
  styleUrl: './movies-icon.component.scss',
})
export class MoviesIconComponent {
  @Input({ required: true }) fill = '';
}
