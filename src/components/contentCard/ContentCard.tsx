import React from "react";
import classes from "./ContentCard.module.scss";
import { default as cn } from "classnames";

export const ContentCard: React.FC<{ className?: string }> = ({
  className,
  children,
}) => {
  return <div className={cn(classes.contentCard, className)}>{children}</div>;
};
