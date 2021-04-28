import React from "react";
import { Box } from "@material-ui/core";
import classes from "./AuthZone.module.scss";
import { Authorize } from "../../authorize/Authorize";
import { Link } from "react-router-dom";
import { UserMenu } from "./userMenu/UserMenu";

export const AuthZone: React.FC = () => {
  return (
    <Box className={classes.authZone}>
      <Authorize
        successRender={(authState) => {
          return <UserMenu userName={authState.me?.profile.name ?? "User"} />;
        }}
        failedRender={() => {
          return (
            <Link className={classes.logAction} to={"/login"}>
              Login
            </Link>
          );
        }}
      />
    </Box>
  );
};
