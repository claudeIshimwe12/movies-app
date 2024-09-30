import { createAction, props } from '@ngrx/store';
import { User } from '../../models/user.interface';

// export const logIn = createAction(
//   "[ Login Component] Log In",
//   props<{ user: User }>(),
// );

// export const logInSuccess = createAction(
//   "[ Login Component] Log In Success",
//   props<{ user: User }>(),
// );
// export const logInFail = createAction("[ Login Component] Log In Fail");

export const logIn = createAction('[Auth] Log In', props<{ user: User }>());

export const logInSuccess = createAction(
  '[Auth] Log In Success',
  props<{ user: User }>(),
);

export const logInFailure = createAction(
  '[Auth] Log In Failure',
  props<{ error: string }>(),
);
