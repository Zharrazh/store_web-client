import React from "react";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import { Link } from "react-router-dom";

type Props = {
  to: string;
};

export const BackLink: React.FC<Props> = ({ to, children }) => {
  return (
    <Link to={to} style={{ fontSize: "0.85rem", textTransform: "uppercase" }}>
      <ArrowBackIosIcon style={{ fontSize: "10px" }} />
      {children}
    </Link>
  );
};
