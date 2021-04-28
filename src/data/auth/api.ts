import { LoginModel, TokenInfo, UserFullInfo } from "./models";
import { http } from "../../utils/http";

const getToken = (data: LoginModel) => {
  return http.post<TokenInfo>("Auth/getToken", data);
};

const getMe = () => {
  return http.get<UserFullInfo>("Auth/me");
};

export const AuthAPI = {
  getToken,
  getMe,
};
