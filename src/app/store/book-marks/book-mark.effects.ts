import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, of, switchMap } from 'rxjs';
import * as BookMarkActions from './book-mark.actions';
import { BookMarksService } from '../../services/book-marks/book-marks.service';

@Injectable()
export class BookMarkEffects {
  constructor(
    private actions$: Actions,
    private bookMarkService: BookMarksService,
  ) {}

  loadBookMarks$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BookMarkActions.loadBookMarkedMovies),
      switchMap(() => {
        const movies = this.bookMarkService.loadBookMarkedMovies();
        if (movies) {
          return of(BookMarkActions.loadBookMarkedMoviesSuccess({ movies }));
        }
        return of(
          BookMarkActions.loadBookMarkedMoviesFail({
            error: 'Error Getting Bookmarks',
          }),
        );
      }),
      catchError((error) =>
        of(
          BookMarkActions.loadBookMarkedMoviesFail({
            error: 'Error Getting Bookmarks: ' + error.message,
          }),
        ),
      ),
    ),
  );

  toggleMovieBookmark$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BookMarkActions.toggleMovieBookmark),
      switchMap(({ movie }) => {
        const updatedMovies = this.bookMarkService.toggleMovieBookmark(movie);
        return of(
          BookMarkActions.loadBookMarkedMoviesSuccess({
            movies: updatedMovies,
          }),
        );
      }),
      catchError((error) =>
        of(
          BookMarkActions.toggleMovieBookmarkFail({
            error: 'Error Toggling Movie Bookmark: ' + error.message,
          }),
        ),
      ),
    ),
  );
}
