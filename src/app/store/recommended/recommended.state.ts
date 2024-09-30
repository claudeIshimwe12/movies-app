import { Movie } from '../../models/movie.interface';
import { createEntityAdapter, EntityState } from '@ngrx/entity';

export interface RecommendedState extends EntityState<Movie> {
  isLoading: boolean;
  error: string;
}

export const adapter = createEntityAdapter<Movie>();

export const initialState = adapter.getInitialState({
  isLoading: false,
  error: '',
});

export const { selectAll } = adapter.getSelectors();
