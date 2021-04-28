import React from "react";
import ReactDOM from "react-dom";

import { Router } from "react-router";

import "./index.css";
import App from "./App";
import { Provider } from "react-redux";

import { store } from "./data/store";
import { createBrowserHistory } from "history";

export const history = createBrowserHistory();

ReactDOM.render(
  <Router history={history}>
    <Provider store={store}>
      <App />
    </Provider>
  </Router>,
  document.getElementById("root")
);
