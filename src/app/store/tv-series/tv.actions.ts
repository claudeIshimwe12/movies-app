import { createAction, props } from '@ngrx/store';
import { Movie } from '../../models/movie.interface';

export const loadTvSeries = createAction(
  '[Tv Series Component] Load Tv Series',
);
export const loadTvSeriesSuccess = createAction(
  '[Tv Series Component] Load Tv Series Success',
  props<{ movies: Movie[] }>(),
);
export const loadTvSeriesFail = createAction(
  '[Tv Series Component] Load Tv Series Fail',
  props<{ error: string }>(),
);
