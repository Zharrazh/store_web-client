import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { CategoriesTree } from "./tree/CategoriesTree";
import { EditableCategoryView } from "./editableView/EditableCategoryView";

export const Categories: React.FC = () => {
  return (
    <Switch>
      <Route path={"/dashboard/categories"} exact component={CategoriesTree} />
      <Route
        path={"/dashboard/categories/edit/:id"}
        component={EditableCategoryView}
      />
      <Route render={() => <Redirect to={"/dashboard/categories"} />} />
    </Switch>
  );
};
