import React from "react";
import { Box, Container, Grid } from "@material-ui/core";
import classes from "./Header.module.scss";
import { default as cn } from "classnames";
import { Link } from "react-router-dom";
import { HeaderNavLink } from "../headerNavLink/HeaderNavLink";
import { AuthZone } from "./authZone/AuthZone";
import { Line } from "../line/Line";
import { Logo } from "../logo/Logo";
import { Button } from "../button/Button";
import { Authorize } from "../authorize/Authorize";

type Props = {
  outlined?: boolean;
};

export const Header: React.FC<Props> = ({ outlined }) => {
  return (
    <Box className={cn(classes.header, { [classes.outline]: outlined })}>
      <Container className={classes.inner}>
        <Grid
          container
          wrap={"nowrap"}
          alignItems={"center"}
          justify={"space-between"}
          className={classes.content}
        >
          <Grid item container wrap={"nowrap"} xs={8} alignItems={"center"}>
            <Grid item xs={5} sm={4} md={3} lg={2}>
              <Link to={"/"}>
                <Logo />
              </Link>
            </Grid>
            <Grid item xs={7} sm={8} md={9} lg={10}>
              <Line alignItems={"center"} spacing={2}>
                <HeaderNavLink to={"/"} exact>
                  Main
                </HeaderNavLink>
                <HeaderNavLink to={"/shop"} exact>
                  Shop
                </HeaderNavLink>
              </Line>
            </Grid>
          </Grid>
          <Grid item xs={4}>
            <Line alignItems={"center"} spacing={2} justify={"flex-end"}>
              <AuthZone />
              <Authorize
                admin
                successRender={() => {
                  return <Button to={"/dashboard"}>Dashboard</Button>;
                }}
              />
            </Line>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};
