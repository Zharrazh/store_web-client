import { ThunkDispatch } from "redux-thunk";
import * as lscache from "lscache";
import { AuthActions } from "../auth/actions";
import { AuthAsyncActions } from "../auth/thunks";
import { InitActions } from "./actions";
import { AppThunk, AppStore } from "../store";
import { AnyAction } from "redux";
import { CategoriesThunks } from "../categories/thunks";

type AppDispatch = ThunkDispatch<AppStore, any, AnyAction>;

export const initAsync = (): AppThunk<Promise<any>> => {
  return async (dispatch: AppDispatch) => {
    lscache.flushExpired();
    const token = lscache.get("token");
    if (token) {
      dispatch(AuthActions.setToken(token));
      await dispatch(AuthAsyncActions.getMeAsync());
    }
    await dispatch(CategoriesThunks.getCategoriesTreeAsync());
    dispatch(InitActions.setInit());
  };
};
