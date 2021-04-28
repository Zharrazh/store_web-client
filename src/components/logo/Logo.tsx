import React from "react";
import logo from "../../assets/svgs/Logo.svg";
import { Line } from "../line/Line";
import classes from "./Logo.module.scss";
import { Typography } from "@material-ui/core";

export const Logo: React.FC<{ dashboard?: boolean }> = React.memo(
  ({ dashboard }) => {
    return (
      <Line direction={"column"} alignItems={"center"} className={classes.logo}>
        <img src={logo} alt={"Froggy from logo"} className={classes.img} />
        {dashboard && (
          <Typography className={classes.text}>DASHBOARD</Typography>
        )}
      </Line>
    );
  }
);
