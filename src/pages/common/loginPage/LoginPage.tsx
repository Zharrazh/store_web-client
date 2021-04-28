import { Container } from "@material-ui/core";
import React from "react";
import { CenterContainer } from "../../../components/centerContainer/centerContainer";
import { LoginForm } from "./loginForm/LoginForm";

export const LoginPage: React.FC = () => {
  return (
    <Container>
      <CenterContainer margin={2} sm={9} md={6} lg={5}>
        <LoginForm />
      </CenterContainer>
    </Container>
  );
};
