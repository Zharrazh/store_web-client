import React from "react";
import { DashboardHeader } from "../../components/dashboardHeader/DashboardHeader";
import { Authorize } from "../../components/authorize/Authorize";
import { DashboardSidebar } from "../../components/dashboardSidebar/DashboardSidebar";

import classes from "./DasboardApp.module.scss";
import { Route, Switch } from "react-router-dom";
import { Container } from "@material-ui/core";
import { Categories } from "./categories/Categories";

export const DashboardApp: React.FC = () => {
  return (
    <Authorize
      admin
      loginRedirect
      successRender={() => {
        return (
          <div className={classes.dashboardApp}>
            <DashboardHeader />

            <Container className={classes.underHeader}>
              <div className={classes.sidebarWrapper}>
                <DashboardSidebar />
              </div>
              <div className={classes.contentWrapper}>
                <Switch>
                  <Route
                    path={"/dashboard/categories"}
                    component={Categories}
                  />
                  <Route
                    path={"/dashboard/goods"}
                    render={() => <h1>Goods</h1>}
                  />
                  <Route
                    path={"/dashboard/users"}
                    render={() => <h1>Users</h1>}
                  />
                  <Route
                    path={"/dashboard/orders"}
                    render={() => <h1>Orders</h1>}
                  />
                  <Route path={"/"} render={() => <h1>Any</h1>} />
                </Switch>
              </div>
            </Container>
          </div>
        );
      }}
    />
  );
};
