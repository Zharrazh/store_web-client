import React, { useEffect } from "react";

import { createMuiTheme, MuiThemeProvider } from "@material-ui/core";
import { Route, Switch } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { initAsync } from "./data/init/thunks";
import { CommonApp } from "./pages/common/CommonApp";
import { DashboardApp } from "./pages/dashboard/DashboardApp";
import { RootState } from "./data/store";

const theme = createMuiTheme({
  typography: {
    fontFamily: '"Montserrat", Arial, Helvetica, sans-serif',
  },
});

function App() {
  const dispatch = useDispatch();
  const isInit = useSelector<RootState, boolean>((state) => state.init.isInit);
  useEffect(() => {
    dispatch(initAsync());
  }, [dispatch]);
  return (
    <>
      {isInit && (
        <MuiThemeProvider theme={theme}>
          <Switch>
            <Route path={"/dashboard"} component={DashboardApp} />
            <Route path={"/"} component={CommonApp} />
          </Switch>
        </MuiThemeProvider>
      )}
      {!isInit && <h1>Initialization</h1>}
    </>
  );
}

export default App;
