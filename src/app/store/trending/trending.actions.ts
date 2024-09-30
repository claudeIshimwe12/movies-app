import { createAction, props } from '@ngrx/store';
import { Movie } from '../../models/movie.interface';

export const loadTrendingMovies = createAction(
  '[Trending Component] Load Trending Movies',
);
export const loadTrendingMoviesSuccess = createAction(
  '[Trending Component] Load Trending Movies Success',
  props<{ movies: Movie[] }>(),
);
export const loadTrendingMoviesFail = createAction(
  '[Trending Component] Load Trending Movies Fail',
  props<{ error: string }>(),
);
