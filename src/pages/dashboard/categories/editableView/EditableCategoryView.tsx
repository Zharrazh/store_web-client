import React, { useCallback, useEffect, useMemo, useState } from "react";
import { EditableText } from "../../../../components/editableText/EditableText";
import { SubmitHandler, useForm } from "react-hook-form";
import { Form } from "../../../../components/form/Form";
import { EditableTextArea } from "../../../../components/editableTextArea/EditableTextArea";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
  CategoryFull,
  CreateUpdateCategoryRequest,
} from "../../../../data/categories/models";
import { useDispatch } from "react-redux";
import { CategoriesAsyncActions } from "../../../../data/categories/thunks";
import { AppDispatch } from "../../../../data/store";
import { useParams } from "react-router-dom";
import classes from "./EditableCategoryView.module.scss";
import { Button } from "@material-ui/core";
import { SectionHeader } from "../../../../components/sectionHeader/sectionHeader";
import { EditableImage } from "../../../../components/editableImage/EditableImage";
import { Line } from "../../../../components/line/Line";
import { BackLink } from "../../../../components/backLink/BackLink";
import {
  BadRequestError,
  combineServerErrors,
  handleServerErrors,
} from "../../../../utils/handleServerResult";
import { ErrorMessage } from "../../../../components/errorMessage/ErrorMessage";

type Input = {
  name: string;
  description: string;
  pic: File | null;
};
const schema = yup.object().shape({
  name: yup.string().required(),
  description: yup.string().required(),
  pic: yup
    .mixed()
    .test(
      "fileSize",
      "File Size is too large",
      (value) => value === null || value.size <= 40000
    ),
});

export const EditableCategoryView: React.FC = () => {
  let params = useParams<{ id: string }>();
  const id = Number.parseInt(params.id);

  const [pureCategory, setPureCategory] = useState<CategoryFull>();
  const pureInput: Input = useMemo(
    () => ({
      name: pureCategory?.name ?? "",
      description: pureCategory?.description ?? "",
      pic: null,
    }),
    [pureCategory]
  );

  const dispatch = useDispatch<AppDispatch>();

  const {
    control,
    handleSubmit,
    errors,
    reset,
    formState,
    setError,
  } = useForm<Input>({
    mode: "onChange",
    resolver: yupResolver(schema),
    defaultValues: pureInput,
  });

  const onCancelHandler = useCallback(() => {
    reset(pureInput);
  }, [pureInput, reset]);

  const uploadAndRefreshForm = useCallback(() => {
    dispatch(CategoriesAsyncActions.getCategoryFullAsync(id)).then((x) => {
      if (!x.isError) {
        setPureCategory(x.data);
        reset({
          name: x.data.name,
          description: x.data.description,
          pic: null,
        });
      }
    });
  }, [dispatch, id, reset]);
  useEffect(() => {
    uploadAndRefreshForm();
  }, [uploadAndRefreshForm]);

  const onSubmit: SubmitHandler<Input> = async (data) => {
    if (pureCategory) {
      const requestData: CreateUpdateCategoryRequest = {
        isNode: pureCategory.isNode,
        parentId: pureCategory.parentId,
        name: data.name,
        description: data.description,
      };

      let serverErrors: BadRequestError<Input> = {};
      if (data.pic) {
        const [updateRes, updatePicRes] = await Promise.all([
          dispatch(CategoriesAsyncActions.updateCategoryAsync(id, requestData)),
          dispatch(CategoriesAsyncActions.updateCategoryPicAsync(id, data.pic)),
        ]);
        serverErrors = combineServerErrors(serverErrors, updateRes);
        serverErrors = combineServerErrors(serverErrors, updatePicRes);
      } else {
        const updateRes = await dispatch(
          CategoriesAsyncActions.updateCategoryAsync(id, requestData)
        );
        serverErrors = combineServerErrors(serverErrors, updateRes);
      }
      handleServerErrors(serverErrors, setError);
      uploadAndRefreshForm();
    }
  };

  const { isValid, isDirty, isSubmitting } = formState;
  return (
    <Form
      onSubmit={handleSubmit(onSubmit)}
      className={classes.editableCategoryView}
    >
      <div className={classes.header}>
        <BackLink to={"/dashboard/categories"}>To categories tree</BackLink>
        <SectionHeader>{`Category "${pureCategory?.name}"`}</SectionHeader>
      </div>

      <Line direction={"column"} spacing={3} className={classes.form}>
        <EditableText
          errors={errors}
          label={"Name"}
          name={"name"}
          control={control}
        />
        <EditableTextArea
          errors={errors}
          label={"Description"}
          name={"description"}
          control={control}
        />
        <ErrorMessage errors={errors} errorName={"other"} />
      </Line>

      <div className={classes.picArea}>
        <EditableImage
          errors={errors}
          className={classes.pic}
          name={"pic"}
          control={control}
          defaultImageUrl={pureCategory?.pic?.path}
          fromServer
        />
      </div>
      <div className={classes.buttonsArea}>
        <Button
          disabled={!isDirty || !isValid || isSubmitting}
          className={classes.submitBtn}
          color={"primary"}
          type="submit"
          fullWidth
          variant={"contained"}
        >
          Submit
        </Button>
        <Button
          disabled={!isDirty || isSubmitting}
          className={classes.cancelBtn}
          color={"default"}
          fullWidth
          variant={"contained"}
          onClick={onCancelHandler}
        >
          Cancel
        </Button>
      </div>
    </Form>
  );
};
