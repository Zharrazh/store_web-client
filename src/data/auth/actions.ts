import { action } from "typesafe-actions";
import { ActionType } from "typesafe-actions/dist/type-helpers";
import { UserFullInfo } from "./models";

export enum AuthActionNames {
  AUTH_SET_TOKEN = "AUTH_SET_TOKEN",
  AUTH_DELETE_AUTH_INFO = "AUTH_DELETE_AUTH_INFO",
  AUTH_SET_ME = "AUTH_SET_ME",
}

const setToken = (token: string) =>
  action(AuthActionNames.AUTH_SET_TOKEN, token);

const deleteAuthInfo = () => action(AuthActionNames.AUTH_DELETE_AUTH_INFO);

const setMe = (data: UserFullInfo) => action(AuthActionNames.AUTH_SET_ME, data);

export const AuthActions = {
  setToken,
  deleteAuthInfo,
  setMe,
};

export type AuthActionTypes = ActionType<typeof AuthActions>;
