import { createReducer, on } from '@ngrx/store';
import { adapter, initialState } from './trending.state';
import * as TrendingActions from './trending.actions';

export const trendingReducer = createReducer(
  initialState,
  on(TrendingActions.loadTrendingMovies, (state) => ({
    ...state,
    isLoading: true,
  })),
  on(TrendingActions.loadTrendingMoviesSuccess, (state, action) =>
    adapter.addMany(action.movies, { ...state, isLoading: false }),
  ),
  on(TrendingActions.loadTrendingMoviesFail, (state, { error }) => ({
    ...state,
    isLoading: false,
    error,
  })),
);
