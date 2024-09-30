import { createFeatureSelector, createSelector } from '@ngrx/store';
import { BookMarkState } from './book-mark.state';
import * as Selectors from './book-mark.state';

export const selectMovies = createFeatureSelector<BookMarkState>('bookMark');

export const selectBookMarkMovies = createSelector(
  selectMovies,
  Selectors.selectAll,
);
