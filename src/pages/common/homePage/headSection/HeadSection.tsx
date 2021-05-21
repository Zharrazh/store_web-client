import React from "react";
import { Box, Container } from "@material-ui/core";
import classes from "./HeadSection.module.scss";
import { Header } from "../../../../components/header/Header";
import { Button } from "../../../../components/button/Button";

export const HeadSection = () => {
  return (
    <Box component={"section"} className={classes.headSection}>
      <Header outlined />
      <Container className={classes.container}>
        <div className={classes.mainText}>
          Need an <span className={classes.exotic}>exotic</span>
          <br /> friend?
        </div>
        <div className={classes.subText}>We will help you to find him</div>
        <div className={classes.btns}>
          <Button>Find your pet</Button>
          <div className={classes.or}>Or</div>
          <Button negative>Consulate</Button>
        </div>
      </Container>
    </Box>
  );
};
