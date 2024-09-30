// import { Injectable } from "@angular/core";
// import { Actions, createEffect, ofType } from "@ngrx/effects";
// import { AuthService } from "../../services/auth/auth.service";
// import * as AuthActions from "./auth.actions";
// import { catchError, of, switchMap } from "rxjs";

// @Injectable()
// export class AuthEffects {
//   constructor(
//     private actions$: Actions,
//     private authService: AuthService,
//   ) {}

//   logIn$ = createEffect(() =>
//     this.actions$.pipe(
//       ofType(AuthActions.logIn),
//       switchMap((action) => {
//         const user = this.authService.authenticateUser(action.user);
//         if (user) {
//           return of(AuthActions.logInSuccess({ user }));
//         }
//         return of(AuthActions.logInFailure({ error: "Invalid credentials" }));
//       }),
//       catchError((error) =>
//         of(AuthActions.logInFailure({ error: error.message })),
//       ),
//     ),
//   );
// }
