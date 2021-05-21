import React from "react";
import { Button, Dialog, DialogContent, TextField } from "@material-ui/core";
import { CategoryTreeElement } from "../../../../../data/categories/models";
import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Form } from "../../../../../components/form/Form";
import { EditableImage } from "../../../../../components/editableImage/EditableImage";
import classes from "./CreateCategoryModal.module.scss";
import { DialogTitle } from "../../../../../components/dialogTitle/DialogTitle";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../../../data/store";
import { CategoriesThunks } from "../../../../../data/categories/thunks";
import {
  combineServerErrors,
  handleServerErrors,
} from "../../../../../utils/handleServerResult";
import { ErrorMessage } from "../../../../../components/errorMessage/ErrorMessage";

type Props = {
  open: boolean;
  onClose: () => void;
  isNode?: boolean;
  parent?: CategoryTreeElement | null;
};

type Input = {
  name: string;
  description: string;
  pic: File | null;
};
const schema = yup.object().shape({
  name: yup.string().label("Name").required(),
  description: yup.string().label("Description").required(),
  pic: yup
    .mixed()
    .label("Category picture")
    .test(
      "fileSize",
      "File Size is too large",
      (value) => value === null || value.size <= 40000
    ),
});

export const CreateCategoryModal: React.FC<Props> = ({
  open,
  onClose,
  isNode,
  parent,
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const {
    register,
    handleSubmit,
    control,
    setError,
    formState,
  } = useForm<Input>({
    reValidateMode: "onChange",
    mode: "onChange",
    resolver: yupResolver(schema),
    defaultValues: {
      name: "",
      description: "",
      pic: null,
    },
  });
  const onSubmit: SubmitHandler<Input> = async (data) => {
    if (parent !== undefined && isNode !== undefined) {
      const createRes = await dispatch(
        CategoriesThunks.createCategoryAsync({
          isNode,
          parentId: parent ? parent.id : null,
          name: data.name,
          description: data.description,
        })
      );
      if (createRes.isError) {
        const errors = combineServerErrors<Input>(undefined, createRes);
        handleServerErrors(errors, setError);
        return;
      }
      if (data.pic) {
        const uploadPicRes = await dispatch(
          CategoriesThunks.updateCategoryPicAsync(createRes.data.id, data.pic)
        );

        if (uploadPicRes.isError) {
          handleServerErrors(
            combineServerErrors<Input>(undefined, uploadPicRes),
            setError
          );
          return;
        }
      }

      onClose();
    }
  };

  const { isSubmitting, isDirty, isValid, errors } = formState;
  return (
    <Dialog open={open} onClose={onClose} maxWidth={"sm"} fullWidth>
      <DialogTitle onClose={onClose}>
        {`Create ${parent == null ? "root" : ""} ${
          isNode ? "node" : "leaf"
        } category ${parent != null ? `(children for "${parent.name}")` : ""}`}
      </DialogTitle>

      <DialogContent style={{ paddingBottom: "16px" }}>
        <Form onSubmit={handleSubmit(onSubmit)} className={classes.form}>
          <div className={classes.mainForm}>
            <TextField
              label={"Name"}
              inputProps={register("name")}
              name={"name"}
              error={!!errors.name}
              helperText={errors.name?.message}
              fullWidth
              variant={"outlined"}
              required
            />
            <TextField
              className={classes.textArea}
              multiline
              fullWidth
              rows={7}
              variant={"outlined"}
              label={"Description"}
              name={"description"}
              inputProps={register("description")}
              required
              error={!!errors.description}
              helperText={errors.description?.message}
              placeholder={
                "Describe the category. Its description will be seen by the user"
              }
            />
            <ErrorMessage errors={errors} errorName={"other"} />
          </div>
          <div className={classes.picArea}>
            <EditableImage name={"pic"} control={control} errors={errors} />
          </div>
          <Button
            // isEmpty это костыль
            disabled={isSubmitting || !isDirty || !isValid}
            className={classes.submitBtn}
            fullWidth
            type={"submit"}
            color={"primary"}
            variant={"contained"}
          >
            Create
          </Button>
          <Button className={classes.cancelBtn} onClick={onClose} fullWidth>
            Cancel
          </Button>
        </Form>
        {/*<div>is dirty {isDirty ? "true" : "false"}</div>*/}
        {/*<div>is submiting {isSubmitting ? "true" : "false"}</div>*/}
        {/*<div>is valid {isValid ? "true" : "false"}</div>*/}
        {/*<div>error {JSON.stringify(errors)}</div>*/}
        {/*<div>isEmpty {isEmpty(errors) ? "true" : "false"}</div>*/}
      </DialogContent>
    </Dialog>
  );
};

// function isEmpty(obj: any) {
//   for (var key in obj) {
//     return false;
//   }
//   return true;
// }
