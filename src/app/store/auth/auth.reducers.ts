import { createReducer, on } from '@ngrx/store';
import * as AuthActions from './auth.actions';
import { AuthState } from './auth.state.interface';

// export interface AuthState {
//   user: User | null;
//   isLoggedIn: boolean;
//   error: string | null;
// }

export const initialState: AuthState = {
  user: null,
  isLoggedIn: false,
  error: null,
};

export const authReducer = createReducer(
  initialState,

  on(AuthActions.logInSuccess, (state, { user }) => ({
    ...state,
    user,
    isLoggedIn: true,
    error: null,
  })),
  on(AuthActions.logInFailure, (state, { error }) => ({
    ...state,
    error,
    isLoggedIn: false,
  })),
);
