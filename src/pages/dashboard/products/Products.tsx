import React from "react";
import { Route, Switch } from "react-router-dom";
import { ProductsTable } from "./table/ProductsTable";
import { ProductsEditableView } from "./editableView/ProductsEditableView";

export const Products: React.FC = () => {
  return (
    <Switch>
      <Route path={"/dashboard/products"} exact component={ProductsTable} />
      <Route
        path={"/dashboard/products/:id"}
        component={ProductsEditableView}
      />
    </Switch>
  );
};
