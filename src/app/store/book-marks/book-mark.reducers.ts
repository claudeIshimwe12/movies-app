import { createReducer, on } from '@ngrx/store';
import { adapter, initialState } from './book-mark.state';
import * as BookMarkActions from './book-mark.actions';

export const bookMarksReducer = createReducer(
  initialState,
  on(BookMarkActions.loadBookMarkedMoviesSuccess, (state, action) =>
    adapter.addMany(action.movies, state),
  ),

  on(BookMarkActions.toggleMovieBookmark, (state, action) => {
    const isAlreadyBookmarked = state.entities[action.movie.id];
    return isAlreadyBookmarked
      ? adapter.removeOne(action.movie.id, state)
      : adapter.addOne(action.movie, state);
  }),
);
