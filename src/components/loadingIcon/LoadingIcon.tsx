import React from "react";
import AutorenewIcon from "@material-ui/icons/Autorenew";
import classes from "./LoadingIcon.module.scss";
import { default as cn } from "classnames";

type Props = {
  isLoading?: boolean;
};
export const LoadingIcon: React.FC<Props> = ({ isLoading = true }) => {
  return (
    <AutorenewIcon
      fontSize={"inherit"}
      className={cn({ [classes.loadingIcon]: isLoading })}
    />
  );
};
