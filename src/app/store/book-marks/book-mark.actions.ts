import { createAction, props } from '@ngrx/store';
import { Movie } from '../../models/movie.interface';

export const loadBookMarkedMovies = createAction(
  '[Book Mark Page Component] Load Book Marked Movies',
);
export const loadBookMarkedMoviesSuccess = createAction(
  '[Book Mark Page Component] Load Book Marked Success',
  props<{ movies: Movie[] }>(),
);
export const loadBookMarkedMoviesFail = createAction(
  '[Book Mark Page Component] Load Book Marked Fail',
  props<{ error: string }>(),
);

export const toggleMovieBookmark = createAction(
  '[BookMarks] Toggle Movie Bookmark',
  props<{ movie: Movie }>(),
);
// export const toggleMovieBookmarkSuccess = createAction(
//   "[BookMarks] Toggle Movie Bookmark Success",
//   props<{ movie: Movie }>(),
// );

export const toggleMovieBookmarkFail = createAction(
  '[BookMarks] Toggle Movie Bookmark Fail',
  props<{ error: string }>(),
);
