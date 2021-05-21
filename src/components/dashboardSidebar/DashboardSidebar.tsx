import React from "react";
import classes from "./DashboardSidebar.module.scss";
import { DashboardSidebarNavLink } from "../dashboardSidebarNavLink/DashboardSidebarNavLink";

export const DashboardSidebar: React.FC = () => {
  return (
    <div className={classes.dashboardSidebar}>
      <DashboardSidebarNavLink to={"/dashboard/categories"}>
        Categories
      </DashboardSidebarNavLink>
      <DashboardSidebarNavLink to={"/dashboard/products"}>
        Products
      </DashboardSidebarNavLink>
      <DashboardSidebarNavLink to={"/dashboard/users"}>
        Users
      </DashboardSidebarNavLink>
      <DashboardSidebarNavLink to={"/dashboard/orders"}>
        Orders
      </DashboardSidebarNavLink>
    </div>
  );
};
