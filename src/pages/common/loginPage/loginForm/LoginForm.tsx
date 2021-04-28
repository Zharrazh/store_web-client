import { Field, getFormError, InjectedFormProps, reduxForm } from "redux-form";
import React from "react";
import { LoginModel } from "../../../../data/auth/models";
import { RenderTextField } from "../../../../components/renderTextField/renderTextField";
import { Line } from "../../../../components/line/Line";
import { Form } from "../../../../components/form/Form";
import { Button } from "@material-ui/core";
import { useSelector } from "react-redux";
import { history } from "../../../../index";
import { AuthAsyncActions } from "../../../../data/auth/thunks";
import { object, string } from "yup";

const schema = object().shape({
  login: string().required().min(3),
  password: string().required().min(3),
});

const LoginFormInner: React.FC<InjectedFormProps<LoginModel>> = ({
  handleSubmit,
  submitting,
}) => {
  const formError = useSelector(getFormError("login"));
  return (
    <Form onSubmit={handleSubmit}>
      <Line direction={"column"} spacing={2}>
        <Field
          name={"login"}
          type={"text"}
          component={RenderTextField}
          label={"Login"}
          required
        />
        <Field
          name={"password"}
          type={"password"}
          component={RenderTextField}
          label={"Password"}
          required
        />
        {formError && <span style={{ color: "red" }}>{formError}</span>}
        <Button
          type={"submit"}
          color={"primary"}
          fullWidth
          variant={"contained"}
          disabled={submitting}
        >
          LOGIN
        </Button>
      </Line>
    </Form>
  );
};

const onSubmit = (values: LoginModel, dispatch: any) => {
  return dispatch(AuthAsyncActions.loginAsync(values));
};

const onSubmitSuccess = () => {
  history.goBack();
};

export const LoginForm = reduxForm<LoginModel>({
  form: "login",
  onSubmit,
  onSubmitSuccess,
  validate: (values) => {
    try {
      schema.validateSync(values, {
        abortEarly: false,
      });
    } catch (errors: any) {
      return errors.inner.reduce(
        (errors: any, err: any) => ({
          ...errors,
          [err.path]: err.message,
        }),
        {}
      );
    }
  },
  touchOnBlur: true,
})(LoginFormInner);
