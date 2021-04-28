import { DeepMap, FieldError } from "react-hook-form";
import React from "react";
import classes from "./ErrorMessage.module.scss";
import { default as cn } from "classnames";

export const ErrorMessage: React.FC<{
  errors: DeepMap<any, FieldError>;
  errorName: string;
  className?: string;
}> = ({ errors, errorName, className }) => {
  if (!errors[errorName]?.message) return null;
  return (
    <span className={cn(classes.errorMessage, className)}>
      {errors[errorName].message}
    </span>
  );
};
