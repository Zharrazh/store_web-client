import { Edit } from "@material-ui/icons";
import React, { useCallback, useState } from "react";
import { ClickAwayListener, FormLabel, TextField } from "@material-ui/core";
import classes from "./EditableText.module.scss";
import { default as cn } from "classnames";
import { IconButton } from "../iconButton/IconButton";
import { Controller, DeepMap, FieldError } from "react-hook-form";
import { ErrorMessage } from "../errorMessage/ErrorMessage";

type Props = {
  label: string;
  name: string;
  control: any;
  className?: string;
  errors?: DeepMap<any, FieldError>;
};

export const EditableText: React.FC<Props> = ({
  label,
  name,
  control,
  className,
  errors,
}) => {
  const [editMode, setEditMode] = useState(false);

  const handleClickOutside = useCallback(() => {
    setEditMode(false);
  }, []);

  return (
    <Controller
      name={name}
      control={control}
      render={({ value, onChange }) => {
        return (
          <ClickAwayListener
            onClickAway={handleClickOutside}
            mouseEvent={"onMouseDown"}
          >
            <div className={cn(classes.editableTextWrapper, className)}>
              <div className={cn({ [classes.hidden]: editMode })}>
                <FormLabel>{label}</FormLabel>
                <div className={classes.editableText}>
                  {value && <span className={classes.text}>{value}</span>}
                  <IconButton
                    onClick={() => {
                      setEditMode(true);
                    }}
                  >
                    <Edit fontSize={"inherit"} />
                  </IconButton>
                </div>
              </div>
              <TextField
                label={label}
                value={value}
                onChange={(e) => {
                  onChange(e.target.value);
                }}
                onKeyDown={(event) => {
                  if (event.key === "Enter") {
                    setEditMode(false);
                  }
                }}
                onBlur={() => {
                  setEditMode(false);
                }}
                className={cn({ [classes.hidden]: !editMode })}
              />
              {errors && (
                <ErrorMessage
                  errors={errors}
                  errorName={name}
                  className={classes.errorMessage}
                />
              )}
            </div>
          </ClickAwayListener>
        );
      }}
    />
  );
};
