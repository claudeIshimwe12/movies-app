import { createFeatureSelector, createSelector } from '@ngrx/store';
import { TvState } from './tv.state';
import * as Selectors from './tv.state';

export const selectMovies = createFeatureSelector<TvState>('series');

export const selectSeries = createSelector(selectMovies, Selectors.selectAll);
export const selectLoader = createSelector(
  selectMovies,
  (state) => state.isLoading,
);
export const selectError = createSelector(selectMovies, (state) => state.error);
