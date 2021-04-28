import { RadioGroup } from "@material-ui/core";
import React from "react";
import { WrappedFieldProps } from "redux-form";

export const renderRadioGroup = ({
  input,
  children,
}: WrappedFieldProps & { children: React.ReactNode }) => (
  <RadioGroup
    {...input}
    children={children}
    value={input.value}
    onChange={(event, value) => {
      input.onChange(value);
      console.log("input.onChange(value)", value);
    }}
  />
);
