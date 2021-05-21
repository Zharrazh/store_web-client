import React, { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ContentCard } from "../../../components/contentCard/ContentCard";
import { Product } from "../../../data/products/models";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../data/store";
import { CategoryMin } from "../../../data/categories/models";
import { CategoriesThunks } from "../../../data/categories/thunks";
import { Breadcrumbs, Button, Typography } from "@material-ui/core";
import { ProductsThunks } from "../../../data/products/thunks";

import classes from "./ProductPage.module.scss";

import frog from "../../../assets/imgs/allowed_imgs_products/frog.jpg";
import hameleon from "../../../assets/imgs/allowed_imgs_products/hameleon.jpg";
import iguana from "../../../assets/imgs/allowed_imgs_products/iguana.jpg";
import { Image } from "../../../components/image/Image";
import { ContentContainer } from "../../../components/contentContainer/ContentContainer";

export const ProductPage: React.FC = () => {
  let { id } = useParams<{ id: string }>();

  const dispatch = useDispatch<AppDispatch>();

  const [product, setProduct] = useState<Product>();
  const [categoryPath, setCategoryPath] = useState<CategoryMin[]>();

  const randImg = useMemo(() => {
    const allowedImg = [frog, hameleon, iguana];
    return allowedImg[getRandomIntInclusive(0, 2)];
  }, []);

  useEffect(() => {
    dispatch(ProductsThunks.getProduct(Number(id))).then((res) => {
      if (res.data) {
        setProduct(res.data);
      }
    });
  }, [dispatch, id]);

  useEffect(() => {
    if (product?.categoryId) {
      dispatch(CategoriesThunks.getPath(product.categoryId)).then((res) => {
        setCategoryPath(res.data);
      });
    }
  }, [product, dispatch]);

  return (
    <ContentContainer>
      <div className={classes.productPage}>
        <ContentCard>
          {product && categoryPath ? (
            <div className={classes.content}>
              <Breadcrumbs className={classes.breadcrumbs}>
                <Link to={"/shop"}>{"< Root"}</Link>
                {categoryPath.map((x) => (
                  <Link key={x.id} to={`/shop?categoryId=${x.id}`}>
                    {x.name}
                  </Link>
                ))}
              </Breadcrumbs>
              <div className={classes.other}>
                <h2 className={classes.name}>{product.name}</h2>
                <p className={classes.price}>{`$ ${product.price}`}</p>
                <Typography variant={"body2"}>{product.description}</Typography>
                <Button
                  variant={"outlined"}
                  fullWidth
                  onClick={() => {
                    alert("It is fake button");
                  }}
                >
                  Buy
                </Button>
              </div>
              <Image className={classes.pic} url={randImg} />
            </div>
          ) : (
            <p>Loading....</p>
          )}
        </ContentCard>
      </div>
    </ContentContainer>
  );
};

function getRandomIntInclusive(min: number, max: number) {
  const min_int = Math.ceil(min);
  const max_int = Math.floor(max);
  return Math.floor(Math.random() * (max_int - min_int + 1)) + min_int; //Максимум и минимум включаются
}
