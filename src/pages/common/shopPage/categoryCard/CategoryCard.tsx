import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../../data/store";
import { CategoryFull } from "../../../../data/categories/models";
import { CategoriesThunks } from "../../../../data/categories/thunks";
import { Link } from "react-router-dom";

import classes from "./CategoryCard.module.scss";
import { Image } from "../../../../components/image/Image";

import notFoundImg from "../../../../assets/imgs/no-img.jpg";
import { Typography } from "@material-ui/core";

export const CategoryCard: React.FC<{ categoryId: number }> = ({
  categoryId,
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const [categoryFull, setCategoryFull] = useState<CategoryFull>();
  const [isFetch, setIsFetch] = useState(false);
  useEffect(() => {
    setIsFetch(true);
    dispatch(CategoriesThunks.getCategoryFullAsync(categoryId)).then((res) => {
      setCategoryFull(res.data);
      setIsFetch(false);
    });
  }, [categoryId, dispatch]);
  if (isFetch) return <h6>Loading</h6>;
  else
    return (
      <>
        {categoryFull && (
          <Link
            to={`/shop?categoryId=${categoryFull.id}`}
            className={classes.categoryCard}
          >
            <Typography className={classes.header}>
              {categoryFull.name}
            </Typography>
            <p className={classes.description}>{categoryFull.description}</p>
            {categoryFull.pic && (
              <Image
                className={classes.pic}
                url={categoryFull.pic.path}
                fromServer
              />
            )}
            {!categoryFull.pic && (
              <Image className={classes.pic} url={notFoundImg} />
            )}
          </Link>
        )}
      </>
    );
};
