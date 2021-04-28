import React, { memo } from "react";
import classes from "./DashboardHeader.module.scss";
import { Box, Container } from "@material-ui/core";
import { Logo } from "../logo/Logo";
import { Line } from "../line/Line";
import { AuthZone } from "../header/authZone/AuthZone";
import { Link } from "react-router-dom";
import { Button } from "../button/Button";

export const DashboardHeader: React.FC = memo(() => {
  return (
    <Box className={classes.dashboardHeader}>
      <Container className={classes.inner}>
        <Line
          alignItems={"center"}
          justify={"space-between"}
          className={classes.content}
        >
          <Box marginLeft={3}>
            <Link to={"/dashboard"}>
              <Line direction={"column"}>
                <Logo dashboard />
              </Line>
            </Link>
          </Box>
          <Line alignItems={"center"} spacing={2}>
            <AuthZone />
            <Button to={"/"}>Go to site</Button>
          </Line>
        </Line>
      </Container>
    </Box>
  );
});
