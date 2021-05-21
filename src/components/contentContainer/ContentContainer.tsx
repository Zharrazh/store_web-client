import React from "react";
import { Container } from "@material-ui/core";

export const ContentContainer: React.FC = ({ children }) => {
  return (
    <div style={{ flexGrow: 1, backgroundColor: "#f1f1f1" }}>
      <Container>
        <>{children}</>
      </Container>
    </div>
  );
};
