import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as TrendingActions from './trending.actions';
import { catchError, map, mergeMap, of } from 'rxjs';
import { MoviesService } from '../../services/movies/movies.service';
@Injectable()
export class TrendingMoviesEffect {
  loadBoards$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TrendingActions.loadTrendingMovies),
      mergeMap(() =>
        this.moviesService.getTrendingMovies().pipe(
          map((movies) =>
            TrendingActions.loadTrendingMoviesSuccess({ movies }),
          ),
          catchError((error) =>
            of(
              TrendingActions.loadTrendingMoviesFail({ error: error.message }),
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
