import { Typography } from "@material-ui/core";
import React from "react";
import { NavLink } from "react-router-dom";

import classes from "./HeaderNavLink.module.scss";

type Props = {
  to: string;
  exact?: boolean;
};

export const HeaderNavLink: React.FC<Props> = ({ to, exact, children }) => {
  return (
    <NavLink
      className={classes.headerNavLink}
      to={to}
      exact={exact}
      activeClassName={classes.active}
    >
      <Typography className={classes.text}>{children}</Typography>
    </NavLink>
  );
};
