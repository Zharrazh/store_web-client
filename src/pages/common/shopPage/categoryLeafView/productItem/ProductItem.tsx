import React, { useMemo } from "react";
import { Product } from "../../../../../data/products/models";
import classes from "./ProductItem.module.scss";
import { Image } from "../../../../../components/image/Image";
import frog from "../../../../../assets/imgs/allowed_imgs_products/frog.jpg";
import hameleon from "../../../../../assets/imgs/allowed_imgs_products/hameleon.jpg";
import iguana from "../../../../../assets/imgs/allowed_imgs_products/iguana.jpg";
import { Typography } from "@material-ui/core";
import { Link } from "react-router-dom";

export const ProductItem: React.FC<{ product: Product }> = ({ product }) => {
  const randImg = useMemo(() => {
    const allowedImg = [frog, hameleon, iguana];
    return allowedImg[getRandomIntInclusive(0, 2)];
  }, []);

  return (
    <div className={classes.productItem}>
      <div className={classes.picWrapper}>
        <Image className={classes.pic} url={randImg} />
      </div>
      <Typography className={classes.header} variant={"h5"} gutterBottom>
        <Link to={`/product/${product.id}`}>{product.name}</Link>
      </Typography>
      <Typography className={classes.desc} variant={"body2"}>
        {product.description}
      </Typography>
      <div className={classes.price}>{`${product.price} $`}</div>
    </div>
  );
};

function getRandomIntInclusive(min: number, max: number) {
  const min_int = Math.ceil(min);
  const max_int = Math.floor(max);
  return Math.floor(Math.random() * (max_int - min_int + 1)) + min_int; //Максимум и минимум включаются
}
