import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as RecommendedActions from './recommended.actions';
import { catchError, map, mergeMap, of } from 'rxjs';
import { MoviesService } from '../../services/movies/movies.service';
@Injectable()
export class RecommendedMoviesEffect {
  loadBoards$ = createEffect(() =>
    this.actions$.pipe(
      ofType(RecommendedActions.loadRecommendedMovies),
      mergeMap(() =>
        this.moviesService.getRecommended().pipe(
          map((movies) =>
            RecommendedActions.loadRecommendedMoviesSuccess({ movies }),
          ),
          catchError((error) =>
            of(
              RecommendedActions.loadRecommendedMoviesFail({
                error: error.message,
              }),
            ),
          ),
        ),
      ),
    ),
  );

  constructor(
    private actions$: Actions,
    private moviesService: MoviesService,
  ) {}
}
