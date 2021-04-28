import {
  ActionsObservable,
  combineEpics,
  StateObservable,
} from "redux-observable";
import { authEpics } from "./auth/epic";
import { catchError } from "rxjs/operators";

export const rootEpic = (
  action$: ActionsObservable<any>,
  store$: StateObservable<any>,
  dependencies: any
) =>
  combineEpics(authEpics)(action$, store$, dependencies).pipe(
    catchError((error, source) => {
      console.error(error);
      return source;
    })
  );
