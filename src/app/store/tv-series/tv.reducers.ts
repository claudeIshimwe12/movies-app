import { createReducer, on } from '@ngrx/store';
import { adapter, initialState } from './tv.state';
import * as TvActions from './tv.actions';

export const tvSeriesReducer = createReducer(
  initialState,
  on(TvActions.loadTvSeries, (state) => ({
    ...state,
    isLoading: true,
  })),
  on(TvActions.loadTvSeriesSuccess, (state, action) =>
    adapter.addMany(action.movies, { ...state, isLoading: false }),
  ),
  on(TvActions.loadTvSeriesFail, (state, { error }) => ({
    ...state,
    isLoading: false,
    error,
  })),
);
