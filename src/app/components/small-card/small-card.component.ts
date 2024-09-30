import { Component, Input } from '@angular/core';
import { Movie } from '../../models/movie.interface';
import { BookMarksService } from '../../services/book-marks/book-marks.service';
import { Store } from '@ngrx/store';
import * as BookMarkActions from '../../store/book-marks/book-mark.actions';

@Component({
  selector: 'app-small-card',
  templateUrl: './small-card.component.html',
  styleUrl: './small-card.component.scss',
})
export class SmallCardComponent {
  @Input({ required: true }) movie!: Movie;

  constructor(
    private bookMarkService: BookMarksService,
    private store: Store,
  ) {}

  bookMark() {
    // this.bookMarkService.addMovie(this.movie);
    this.store.dispatch(
      BookMarkActions.toggleMovieBookmark({ movie: this.movie }),
    );
  }
}
