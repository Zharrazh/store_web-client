import { Box } from "@material-ui/core";
import React from "react";
import { NavLink } from "react-router-dom";

import classes from "./DashboardSidebarNavLink.module.scss";

type Props = {
  to: string;
  exact?: boolean;
};

export const DashboardSidebarNavLink: React.FC<Props> = ({
  to,
  exact,
  children,
}) => {
  return (
    <Box className={classes.dashboardSidebarNavLink}>
      <NavLink
        to={to}
        exact={exact}
        className={classes.navLink}
        activeClassName={classes.active}
      >
        {children}
      </NavLink>
    </Box>
  );
};
