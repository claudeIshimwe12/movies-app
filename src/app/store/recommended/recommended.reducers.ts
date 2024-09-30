import { createReducer, on } from '@ngrx/store';
import { adapter, initialState } from './recommended.state';
import * as RecommendedActions from './recommended.actions';

export const recommendedReducer = createReducer(
  initialState,
  on(RecommendedActions.loadRecommendedMovies, (state) => ({
    ...state,
    isLoading: true,
  })),
  on(RecommendedActions.loadRecommendedMoviesSuccess, (state, action) =>
    adapter.addMany(action.movies, { ...state, isLoading: false }),
  ),
  on(RecommendedActions.loadRecommendedMoviesFail, (state, { error }) => ({
    ...state,
    isLoading: false,
    error,
  })),
);
