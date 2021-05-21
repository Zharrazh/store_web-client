import { Route, Switch } from "react-router-dom";
import { Header } from "../../components/header/Header";
import { HomePage } from "./homePage/HomePage";
import { LoginPage } from "./loginPage/LoginPage";
import React from "react";
import { ShopPage } from "./shopPage/ShopPage";
import { ProductPage } from "./productPage/ProductPage";

export const CommonApp: React.FC = () => {
  return (
    <div
      style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}
    >
      <Switch>
        <Route path={"/"} exact />
        <Route path={"/"} component={Header} />
      </Switch>
      <Switch>
        <Route path={"/"} exact component={HomePage} />
        <Route path={"/login"} exact component={LoginPage} />
        <Route path={"/shop"} exact component={ShopPage} />
        <Route path={"/product/:id"} exact component={ProductPage} />
      </Switch>
    </div>
  );
};
