import React from "react";
import classes from "./Image.module.scss";
import { default as cn } from "classnames";

type Props = {
  url: string;
  alt?: string;
  fromServer?: boolean;
  className?: string;
};
export const Image: React.FC<Props> = ({
  url,
  alt = "img",
  fromServer,
  className,
}) => {
  return (
    <img
      alt={alt}
      className={cn(classes.image, className)}
      src={fromServer ? `https://localhost:5001/${url}` : url}
    />
  );
};
