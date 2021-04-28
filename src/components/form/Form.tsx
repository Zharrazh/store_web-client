import React from "react";
import classes from "./Form.module.scss";
import { default as cn } from "classnames";

export const Form: React.FC<{
  onSubmit: (data: any) => void;
  className?: string;
}> = ({ onSubmit, children, className }) => {
  return (
    <form className={cn(classes.form, className)} onSubmit={onSubmit}>
      {children}
    </form>
  );
};
