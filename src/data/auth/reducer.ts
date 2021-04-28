import { AuthActionNames, AuthActionTypes } from "./actions";
import { UserFullInfo } from "./models";

export interface AuthState {
  token?: String;
  isAuth: boolean;
  me?: UserFullInfo;
}

const init: AuthState = {
  isAuth: false,
};

export const AuthReducer = (
  state = init,
  action: AuthActionTypes
): AuthState => {
  switch (action.type) {
    case AuthActionNames.AUTH_SET_TOKEN:
      return { ...state, isAuth: true, token: action.payload };
    case AuthActionNames.AUTH_DELETE_AUTH_INFO:
      return { ...state, isAuth: false, token: undefined, me: undefined };
    case AuthActionNames.AUTH_SET_ME:
      return { ...state, me: action.payload };
    default:
      return state;
  }
};
