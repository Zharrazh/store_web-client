import React from "react";
import { Box, Container } from "@material-ui/core";
import classes from "./HeadSection.module.scss";
import { Header } from "../../../../components/header/Header";

export const HeadSection = () => {
  return (
    <Box component={"section"} className={classes.headSection}>
      <Header outlined />
      <Container>header content</Container>
    </Box>
  );
};
