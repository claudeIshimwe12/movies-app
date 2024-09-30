import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as TvActions from './tv.actions';
import { catchError, map, mergeMap, of } from 'rxjs';
import { MoviesService } from '../../services/movies/movies.service';
@Injectable()
export class TvSeriesEffect {
  loadSeries$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TvActions.loadTvSeries),
      mergeMap(() =>
        this.moviesService.getSeries().pipe(
          map((movies) => TvActions.loadTvSeriesSuccess({ movies })),
          catchError((error) =>
            of(TvActions.loadTvSeriesFail({ error: error.message })),
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
