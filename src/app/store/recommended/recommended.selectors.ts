import { createFeatureSelector, createSelector } from '@ngrx/store';
import { RecommendedState } from './recommended.state';
import * as Selectors from './recommended.state';

export const selectMovies =
  createFeatureSelector<RecommendedState>('recommended');

export const selectRecommendedMovies = createSelector(
  selectMovies,
  Selectors.selectAll,
);
export const selectLoader = createSelector(
  selectMovies,
  (state) => state.isLoading,
);
export const selectError = createSelector(selectMovies, (state) => state.error);
