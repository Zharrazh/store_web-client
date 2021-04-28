import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../data/store";
import { AuthState } from "../../data/auth/reducer";
import { Redirect } from "react-router-dom";

type Props = {
  admin?: boolean;
  loginRedirect?: boolean;
  successRender?: (authInfo: AuthState) => React.ReactElement;
  failedRender?: (authInfo: AuthState) => React.ReactElement;
};

export const Authorize: React.FC<Props> = React.memo(
  ({
    children,
    admin,
    loginRedirect,
    successRender = null,
    failedRender = null,
  }): React.ReactElement<any, any> | null => {
    const authInfo = useSelector<RootState, AuthState>((state) => state.auth);
    let succeededAuthorize =
      authInfo.isAuth &&
      (!admin || (admin && authInfo.me?.roles.includes("admin")));

    if (succeededAuthorize) {
      return (
        <>
          {successRender ? successRender(authInfo) : null}
          {children}
        </>
      );
    } else {
      if (loginRedirect) {
        return <Redirect to={"/login"} />;
      }
      return (
        <>
          {failedRender ? failedRender(authInfo) : null}
          {children}
        </>
      );
    }
  }
);
