import classes from "./sectionHeader.module.scss";
import React from "react";
import { default as cn } from "classnames";

type Props = {
  className?: string;
};

export const SectionHeader: React.FC<Props> = ({ className, children }) => {
  return <h2 className={cn(classes.sectionHeader, className)}>{children}</h2>;
};
