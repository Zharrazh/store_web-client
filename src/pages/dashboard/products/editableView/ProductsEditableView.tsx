import { Button, Grid, TextField, Typography } from "@material-ui/core";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { Controller, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Product } from "../../../../data/products/models";
import { AppDispatch, AppStore } from "../../../../data/store";
import { ProductsThunks } from "../../../../data/products/thunks";
import { SectionHeader } from "../../../../components/sectionHeader/sectionHeader";
import { BackLink } from "../../../../components/backLink/BackLink";
import { Form } from "../../../../components/form/Form";
import classes from "./ProductsEditableView.module.scss";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { ErrorMessage } from "../../../../components/errorMessage/ErrorMessage";
import { CategoryFull } from "../../../../data/categories/models";
import { CategoriesThunks } from "../../../../data/categories/thunks";
import {
  combineServerErrors,
  handleServerErrors,
} from "../../../../utils/handleServerResult";
import { Alert } from "@material-ui/lab";

type Input = {
  name: string;
  categoryId: number;
  price: number;
  description: string;
};

export const ProductsEditableView: React.FC = () => {
  let params = useParams<{ id: string }>();
  const id = useMemo(() => Number.parseInt(params.id), [params]);

  const dispatch = useDispatch<AppDispatch>();

  const [isFetch, setIsFetch] = useState(false);
  const [pureProduct, setPureProduct] = useState<Product>();
  const [message, setMessage] = useState<string>();

  const {
    isFetching: rdx_categoriesLeafsIsFetch,
    leafs: rdx_categoriesLeafs,
  } = useSelector<AppStore, { isFetching: boolean; leafs?: CategoryFull[] }>(
    (state) => state.categories.leafsZone
  );

  const {
    register,
    reset,
    handleSubmit,
    control,
    formState,
    setError,
  } = useForm<Input>({
    defaultValues: pureProduct,
    mode: "onChange",
  });

  useEffect(() => {
    dispatch(CategoriesThunks.getLeafs());
    setIsFetch(true);
    dispatch(ProductsThunks.getProduct(id)).then((res) => {
      setPureProduct(res.data);
      reset(res.data);
      setIsFetch(false);
    });
  }, [dispatch, id, reset]);

  const submitHandler = useCallback(
    (data: Input) => {
      dispatch(ProductsThunks.updateProduct(id, data)).then((res) => {
        if (!res.isError) {
          setMessage("Product was updated!");
        } else {
          handleServerErrors(combineServerErrors(undefined, res), setError);
        }
      });
    },
    [id, dispatch, setError]
  );

  const { isDirty, isValid, errors } = formState;
  return (
    <div className={classes.productsEditableView}>
      <div className={classes.header}>
        <BackLink to={"/dashboard/products"}>Back to the table</BackLink>
        <SectionHeader
          className={classes.header_title}
        >{`Product "${pureProduct?.name}"`}</SectionHeader>
      </div>

      {!isFetch && (
        <Form onSubmit={handleSubmit(submitHandler)} className={classes.form}>
          <div>
            <Typography variant={"caption"}>Category</Typography>
            <Controller
              control={control}
              name={"categoryId"}
              defaultValue={pureProduct?.categoryId ?? null}
              render={({ field }) => (
                <Autocomplete
                  options={rdx_categoriesLeafs ?? []}
                  loading={rdx_categoriesLeafsIsFetch}
                  placeholder={"Please select a category"}
                  getOptionLabel={(x) => x.name}
                  value={
                    field.value
                      ? rdx_categoriesLeafs?.find(
                          (x) => x.id === field.value
                        ) ?? null
                      : null
                  }
                  onChange={(_, value) => field.onChange(value?.id)}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      error={!!errors.categoryId}
                      helperText={errors.categoryId?.message}
                    />
                  )}
                />
              )}
            />
          </div>

          <div>
            <Typography variant={"caption"}>Name</Typography>
            <TextField
              fullWidth
              name={"name"}
              inputProps={register("name")}
              placeholder={"Please write a name"}
              error={!!errors.name}
              helperText={errors.name?.message}
            />
          </div>
          <div>
            <Typography variant={"caption"}>Price</Typography>
            <TextField
              type={"decimal"}
              inputMode={"decimal"}
              fullWidth
              // inputRef={register}
              name={"price"}
              inputProps={register("price")}
              placeholder={"Please write a price in dollars"}
              error={!!errors.price}
              helperText={errors.price?.message}
            />
          </div>
          <div>
            <Typography variant={"caption"}>Description</Typography>
            <TextField
              rows={7}
              fullWidth
              multiline
              // inputRef={register}
              name={"description"}
              inputProps={register("description")}
              placeholder={"Please write a description"}
              error={!!errors.description}
              helperText={errors.description?.message}
            />
          </div>
          <ErrorMessage errors={errors} errorName={"other"} />
          <Grid container spacing={2}>
            <Grid item sm={6}>
              <Button
                disabled={!isDirty || !isValid}
                type={"submit"}
                fullWidth
                variant={"contained"}
                color={"primary"}
              >
                Submit
              </Button>
            </Grid>
            <Grid item sm={6}>
              <Button
                disabled={!isDirty}
                onClick={() => {
                  reset(pureProduct);
                }}
                fullWidth
                variant={"outlined"}
              >
                Cancel
              </Button>
            </Grid>
          </Grid>
          {message && (
            <Alert
              severity="success"
              variant={"outlined"}
              onClose={() => {
                setMessage(undefined);
              }}
            >
              {message}
            </Alert>
          )}
        </Form>
      )}
    </div>
  );
};
