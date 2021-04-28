import { Route, Switch } from "react-router-dom";
import { Header } from "../../components/header/Header";
import { HomePage } from "./homePage/HomePage";
import { LoginPage } from "./loginPage/LoginPage";
import React from "react";

export const CommonApp: React.FC = () => {
  return (
    <>
      <Switch>
        <Route path={"/"} exact />
        <Route path={"/"} component={Header} />
      </Switch>
      <Switch>
        <Route path={"/"} exact component={HomePage} />
        <Route path={"/login"} exact component={LoginPage} />
      </Switch>
    </>
  );
};
