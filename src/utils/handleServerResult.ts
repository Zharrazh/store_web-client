import { ErrorOption } from "react-hook-form";
import { ResponseType } from "../data/store";
import { AjaxError } from "rxjs/ajax";

export function mapServerError<T>(errors: { [P in keyof T]?: string[] }) {
  let mappedErrors: { [P in keyof T]?: string } = {};
  for (const key in errors) {
    if (key === "") {
      mappedErrors = { ...mappedErrors, _error: errors[key]!.join("\n") };
    } else {
      mappedErrors = { ...mappedErrors, [key]: errors[key]!.join("\n") };
    }
  }
  return mappedErrors;
}
export type WithSummary<T> = T & { [""]: never };

export type BadRequestError<T> = {
  [P in keyof T]?: string[];
} & { other?: string[] };

export function combineServerErrors<T>(
  serverErrors: BadRequestError<T> | undefined = {},
  res: ResponseType
): BadRequestError<T> {
  let result: BadRequestError<T> = {};
  if (res.isError) {
    if (res.code === 400) {
      result = { ...serverErrors, ...res.data };
      result.other = res.data[""];
    } else {
      result.other = ["Something wrong"];
    }
  }
  return result;
}

export function handleServerErrors<T>(
  serverErrors: BadRequestError<T>,
  setError: (name: any, error: ErrorOption) => void
) {
  Object.entries(serverErrors).forEach(([key, messageArr]) => {
    if (messageArr)
      messageArr.forEach((message) => {
        setError(key, { type: "server", message: message });
      });
  });
}

export const thunkHandleError = (e: any) => {
  const error = e as AjaxError;
  return {
    isError: true,
    code: error.status,
    data: error.response,
  };
};
