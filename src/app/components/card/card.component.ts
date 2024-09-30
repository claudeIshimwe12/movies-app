import { Component, Input } from '@angular/core';
import { Movie } from '../../models/movie.interface';
import * as BookMarkActions from '../../store/book-marks/book-mark.actions';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
})
export class CardComponent {
  @Input({ required: true }) movie!: Movie;

  constructor(private store: Store) {}

  bookMark() {
    this.store.dispatch(
      BookMarkActions.toggleMovieBookmark({ movie: this.movie }),
    );
  }
}
