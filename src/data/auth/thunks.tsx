import { LoginModel } from "./models";
import { ThunkAction } from "redux-thunk";
import { AuthAPI } from "./api";
import { AjaxError } from "rxjs/ajax";
import { SubmissionError } from "redux-form";
import { mapServerError, WithSummary } from "../../utils/handleServerResult";
import { AuthActions } from "./actions";
import lscache from "lscache";
import { AppThunk } from "../store";

const loginAsync = (data: LoginModel): AppThunk<any> => {
  return async (dispatch) => {
    try {
      const authInfo = await AuthAPI.getToken(data).toPromise();
      dispatch(AuthActions.setToken(authInfo.token));
      const expiresInMinutes =
        (Date.parse(authInfo.expires) - Date.now()) / 60000;
      lscache.set("token", authInfo.token, expiresInMinutes);
      await dispatch(getMeAsync());
    } catch (error) {
      const asError = error as AjaxError;
      if (error.status === 400)
        throw new SubmissionError(
          mapServerError<WithSummary<LoginModel>>(asError.response)
        );
      else
        throw new SubmissionError({
          _error: "Something wrong with server!",
        });
    }
  };
};

const getMeAsync = (): AppThunk<Promise<void>> => {
  return async (dispatch) => {
    const me = await AuthAPI.getMe().toPromise();
    dispatch(AuthActions.setMe(me));
  };
};

const logoutAsync = (): ThunkAction<any, any, any, any> => {
  return (dispatch) => {
    lscache.remove("token");
    dispatch(AuthActions.deleteAuthInfo());
  };
};
export const AuthAsyncActions = {
  loginAsync,
  logoutAsync,
  getMeAsync,
};
