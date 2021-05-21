import React from "react";
import { useSelector } from "react-redux";
import { AppStore } from "../../../../data/store";
import { CategoryTree } from "../../../../data/categories/models";
import { Typography } from "@material-ui/core";
import { CategoryCard } from "../categoryCard/CategoryCard";

import classes from "./CategoryRootView.module.scss";
import { ContentCard } from "../../../../components/contentCard/ContentCard";

export const CategoryRootView: React.FC = () => {
  const rdx_categoryTree = useSelector<AppStore, CategoryTree | undefined>(
    (state) => state.categories.treeZone.tree
  );
  return (
    <div className={classes.categoryRootView}>
      <ContentCard>
        <Typography variant={"body1"} gutterBottom>
          Here are our main product categories
        </Typography>
        <Typography variant={"body2"}>
          We offer different types of exotic animals, care products, food,
          medicines and other things
        </Typography>
        <div className={classes.listOfCategories}>
          {rdx_categoryTree &&
            rdx_categoryTree.rootCategories.map((x) => (
              <CategoryCard key={x.id} categoryId={x.id} />
            ))}
        </div>
      </ContentCard>
    </div>
  );
};
