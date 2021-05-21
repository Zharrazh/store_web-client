import React from "react";
import { CategoryFull, CategoryMin } from "../../../../data/categories/models";
import classes from "./CategoryNodeView.module.scss";
import { ContentCard } from "../../../../components/contentCard/ContentCard";
import { Breadcrumbs, Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
import { CategoryCard } from "../categoryCard/CategoryCard";

export const CategoryNodeView: React.FC<{
  category: CategoryFull;
  categoryPath: CategoryMin[];
}> = ({ category, categoryPath }) => {
  return (
    <div className={classes.categoryNodeView}>
      <ContentCard>
        <Breadcrumbs>
          <Link to={"/shop"}>{"<"} Root</Link>
          {categoryPath.slice(undefined, categoryPath.length - 1).map((x) => (
            <Link key={x.id} to={`/shop?categoryId=${x.id}`}>
              {x.name}
            </Link>
          ))}
          <Typography>{category.name}</Typography>
        </Breadcrumbs>
        <Typography variant={"h5"} style={{ marginTop: "8px" }}>
          {category.name}
        </Typography>
        <Typography variant={"body1"} gutterBottom>
          {category.description}
        </Typography>
        <div className={classes.listOfCategories}>
          <div className={classes.listOfCategories}>
            {category.childCategories &&
              category.childCategories.map((x) => (
                <CategoryCard key={x.id} categoryId={x.id} />
              ))}
          </div>
        </div>
      </ContentCard>
    </div>
  );
};
