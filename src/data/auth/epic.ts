import { combineEpics } from "redux-observable";

// const loginAsyncEpic: Epic = (action$) =>
//   action$.pipe(
//     ofType(AuthActionNames.AUTH_LOGIN_ASYNC),
//     mergeMap((action) =>
//       AuthAPI.getToken(action.payload).pipe(
//         concatMap((response) =>
//           of(AuthActions.setAuthInfo(response), AuthActions.getMeAsync())
//         ),
//         catchError((errorResponse: AjaxError) => {
//           return of(
//             stopSubmit(
//               "login",
//               mapServerError<WithSummary<LoginModel>>(errorResponse.response)
//             )
//           );
//         })
//       )
//     )
//   );
//
// const getMeAsyncEpic: Epic<AuthActionTypes, any, RootState> = (
//   action$,
//   state$
// ) =>
//   action$.pipe(
//     ofType(AuthActionNames.AUTH_GET_ME_ASYNC),
//     audit(() => state$.pipe(filter((value) => value.auth.isAuth))),
//     mergeMap((action) =>
//       AuthAPI.getMe().pipe(map((response) => AuthActions.setMe(response)))
//     )
//   );

export const authEpics = combineEpics();
