import { Movie } from '../../models/movie.interface';
import { createEntityAdapter, EntityState } from '@ngrx/entity';

export type BookMarkState = EntityState<Movie>;

export const adapter = createEntityAdapter<Movie>();

export const initialState = adapter.getInitialState({});

export const { selectAll } = adapter.getSelectors();
