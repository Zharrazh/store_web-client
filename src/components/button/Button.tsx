import React, { forwardRef } from "react";
import { Link } from "react-router-dom";
import { default as cn } from "classnames";
import classes from "./Button.module.scss";

type Props = {
  to?: string;
  onClick?: () => void;
  children?: React.ReactNode;
  negative?: boolean;
};

export const Button = React.memo(
  forwardRef<any, Props>(({ to, onClick, children, negative }, ref) => {
    if (to) {
      return (
        <Link
          ref={ref}
          className={cn(classes.button, { [classes.negative]: negative })}
          to={to}
          onClick={onClick}
        >
          {children}
        </Link>
      );
    } else {
      return (
        <button
          className={cn(classes.button, { [classes.negative]: negative })}
          ref={ref}
          onClick={onClick}
        >
          {children}
        </button>
      );
    }
  })
);
