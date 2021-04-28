import React from "react";
import classes from "./IconButton.module.scss";
import { default as cn } from "classnames";

type Props = {
  color?: "blue" | "green" | "red" | "default";
  onClick?: (event: React.MouseEvent<HTMLSpanElement, MouseEvent>) => any;
  className?: string;
};
export const IconButton: React.FC<Props> = ({
  color,
  onClick,
  className,
  children,
}) => {
  return (
    <span
      onClick={onClick}
      className={cn(classes.iconButton, className, {
        [classes.blue]: color === "blue",
        [classes.green]: color === "green",
        [classes.red]: color === "red",
      })}
    >
      {children}
    </span>
  );
};
