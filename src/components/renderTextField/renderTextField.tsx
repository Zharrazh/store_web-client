import { WrappedFieldProps } from "redux-form";
import { TextField } from "@material-ui/core";
import React from "react";

export const RenderTextField = ({
  input,
  type,
  required,
  label,
  meta,
}: WrappedFieldProps & { label: string; type: string; required?: boolean }) => (
  <TextField
    {...input}
    type={type}
    name={input.name}
    label={label}
    error={meta.invalid && meta.touched}
    helperText={meta.visited && meta.error}
    required={required}
    fullWidth
  />
);
