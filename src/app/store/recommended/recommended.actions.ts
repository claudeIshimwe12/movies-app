import { createAction, props } from '@ngrx/store';
import { Movie } from '../../models/movie.interface';

export const loadRecommendedMovies = createAction(
  '[Home Component] Load Recommended Movies',
);
export const loadRecommendedMoviesSuccess = createAction(
  '[Home Component] Load Recommended Movies Success',
  props<{ movies: Movie[] }>(),
);
export const loadRecommendedMoviesFail = createAction(
  '[Home Component] Load Recommended Movies Fail',
  props<{ error: string }>(),
);
