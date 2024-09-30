import { createFeatureSelector, createSelector } from '@ngrx/store';
import { TrendingState } from './trending.state';
import * as Selectors from './trending.state';

export const selectMovies = createFeatureSelector<TrendingState>('trending');

export const selectTrendingMovies = createSelector(
  selectMovies,
  Selectors.selectAll,
);
export const selectLoader = createSelector(
  selectMovies,
  (state) => state.isLoading,
);
export const selectError = createSelector(selectMovies, (state) => state.error);
