import React, { forwardRef } from "react";
import { Link } from "react-router-dom";
import classes from "./Button.module.scss";

type Props = {
  to?: string;
  onClick?: () => void;
  children?: React.ReactNode;
};

export const Button = React.memo(
  forwardRef<any, Props>(({ to, onClick, children }, ref) => {
    if (to) {
      return (
        <Link
          ref={ref}
          className={classes.buttonLink}
          to={to}
          onClick={onClick}
        >
          {children}
        </Link>
      );
    } else {
      return (
        <button className={classes.buttonLink} ref={ref} onClick={onClick}>
          {children}
        </button>
      );
    }
  })
);
