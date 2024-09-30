import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-book-mark-icon',
  templateUrl: './book-mark-icon.component.svg',
  styleUrl: './book-mark-icon.component.scss',
})
export class BookMarkIconComponent {
  @Input({ required: true }) fill = '';
}
