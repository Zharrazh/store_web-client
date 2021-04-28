import React from "react";
import {
  Grid,
  GridDirection,
  GridItemsAlignment,
  GridJustification,
  GridSpacing,
  GridWrap,
} from "@material-ui/core";

type Props = {
  alignItems?: GridItemsAlignment;
  direction?: GridDirection;
  justify?: GridJustification;
  spacing?: GridSpacing;
  wrap?: GridWrap;
  className?: string;
};

export const Line: React.FC<Props> = ({
  alignItems,
  direction,
  justify,
  spacing,
  wrap = "nowrap",
  className,
  children,
}) => {
  return (
    <Grid
      alignItems={alignItems}
      direction={direction}
      justify={justify}
      spacing={spacing}
      wrap={wrap}
      className={className}
      container
    >
      {React.Children.map(children, (child) => {
        return <Grid item>{child}</Grid>;
      })}
    </Grid>
  );
};
