import React from "react";
import { Box, Grid } from "@material-ui/core";

type Props = {
  margin?: any;
  padding?: any;
  sm?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
  md?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
  lg?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
};

export const CenterContainer: React.FC<Props> = ({
  margin,
  padding,
  sm,
  md,
  lg,
  children,
}) => {
  return (
    <Box margin={margin} padding={padding}>
      <Grid container direction={"column"} alignItems={"center"}>
        <Grid container item sm={sm} md={md} lg={lg}>
          {children}
        </Grid>
      </Grid>
    </Box>
  );
};
