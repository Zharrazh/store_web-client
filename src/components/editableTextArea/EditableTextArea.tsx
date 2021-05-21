import { Edit } from "@material-ui/icons";
import React, { useCallback, useState } from "react";
import {
  ClickAwayListener,
  FormLabel,
  TextareaAutosize,
} from "@material-ui/core";
import classes from "./EditableTextArea.module.scss";
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

export const EditableTextArea: React.FC<Props> = ({
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
      render={({ field: { value, onChange } }) => {
        return (
          <ClickAwayListener
            onClickAway={handleClickOutside}
            mouseEvent={"onMouseDown"}
          >
            <div className={cn(classes.editableTextBoxWrapper, className)}>
              <div>
                <FormLabel>{label}</FormLabel>
                <div
                  className={cn(
                    { [classes.hidden]: editMode },
                    classes.editableTextBox
                  )}
                >
                  {value && <div className={classes.text}>{value}</div>}
                  <IconButton
                    onClick={() => {
                      setEditMode(true);
                    }}
                  >
                    <Edit fontSize={"inherit"} />
                  </IconButton>
                </div>
              </div>
              <TextareaAutosize
                value={value}
                rows={6}
                rowsMin={6}
                rowsMax={12}
                onChange={(event) => {
                  onChange(event.target.value);
                }}
                onBlur={() => {
                  setEditMode(false);
                }}
                className={cn(classes.textArea, {
                  [classes.hidden]: !editMode,
                })}
              />
              {errors && <ErrorMessage errors={errors} errorName={name} />}
            </div>
          </ClickAwayListener>
        );
      }}
    />
  );
};
