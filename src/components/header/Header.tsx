import React from "react";
import { Box, Container } from "@material-ui/core";
import classes from "./Header.module.scss";
import { default as cn } from "classnames";
import { Link } from "react-router-dom";
import { HeaderNavLink } from "../headerNavLink/HeaderNavLink";
import { AuthZone } from "./authZone/AuthZone";
import { Logo } from "../logo/Logo";

type Props = {
  outlined?: boolean;
};

export const Header: React.FC<Props> = ({ outlined }) => {
  return (
    <Box className={cn(classes.header, { [classes.outline]: outlined })}>
      <Container className={classes.inner}>
        <Link to={"/"} style={{ paddingTop: "7px" }}>
          <Logo />
        </Link>
        <div className={classes.menu}>
          <HeaderNavLink to={"/"} exact>
            Home
          </HeaderNavLink>
          <HeaderNavLink to={"/shop"} exact>
            Shop
          </HeaderNavLink>
        </div>
        <AuthZone />
      </Container>
    </Box>
  );
};
