import React from "react";
import { Image } from "../../components/image/Image";
import noImg from "../../assets/imgs/no-img.jpg";
import { Controller, DeepMap, FieldError } from "react-hook-form";
import { Button } from "@material-ui/core";
import classes from "./EditableImage.module.scss";
import { default as cn } from "classnames";
import { ErrorMessage } from "../errorMessage/ErrorMessage";

type Props = {
  name: string;
  defaultImageUrl?: string;
  fromServer?: boolean;
  control: any;
  className?: string;
  errors?: DeepMap<any, FieldError>;
};

export const EditableImage: React.FC<Props> = ({
  name,
  control,
  errors,
  defaultImageUrl,
  fromServer,
  className,
}) => {
  if (!defaultImageUrl) fromServer = false;
  return (
    <Controller
      name={name}
      control={control}
      render={({ value, onChange }) => {
        return (
          <div className={cn(className, classes.editableImage)}>
            {value ? (
              <div className={classes.imageContainer}>
                <Image
                  alt={"category img"}
                  url={URL.createObjectURL(value)}
                  className={classes.image}
                />
              </div>
            ) : (
              <div className={classes.imageContainer}>
                <Image
                  alt={"category img"}
                  url={defaultImageUrl ?? noImg}
                  fromServer={fromServer}
                  className={classes.image}
                />
              </div>
            )}
            <input
              type={"file"}
              name={name}
              id={`${name}_file_input`}
              onChange={(event) => {
                if (event.target.files) {
                  onChange(event.target.files[0]);
                }
              }}
              style={{ display: "none" }}
            />

            <Button
              fullWidth
              variant={"outlined"}
              className={classes.changeImageBtn}
            >
              <label htmlFor={`${name}_file_input`}>Change Image</label>
            </Button>
            {errors && (
              <ErrorMessage
                errors={errors}
                errorName={name}
                className={classes.errorMessage}
              />
            )}
          </div>
        );
      }}
    />
  );
};
