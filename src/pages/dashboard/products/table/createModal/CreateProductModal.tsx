import {
  Button,
  Dialog,
  DialogContent,
  Grid,
  TextField,
  Typography,
} from "@material-ui/core";
import React, { useCallback } from "react";
import { DialogTitle } from "../../../../../components/dialogTitle/DialogTitle";
import { Controller, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, AppStore } from "../../../../../data/store";
import { CategoryFull } from "../../../../../data/categories/models";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { Line } from "../../../../../components/line/Line";
import { Form } from "../../../../../components/form/Form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { ProductsThunks } from "../../../../../data/products/thunks";
import {
  combineServerErrors,
  handleServerErrors,
} from "../../../../../utils/handleServerResult";
import { ErrorMessage } from "../../../../../components/errorMessage/ErrorMessage";

type Props = {
  open: boolean;
  onClose: () => void;
};
type Input = {
  name: string;
  categoryId: number;
  price: number;
  description: string;
};

const schema = yup.object({
  name: yup.string().required().min(3).max(100),
  categoryId: yup.number().required(),
  price: yup.number().required().min(0.01),
  description: yup.string().required().min(10),
});

export const CreateProductModal: React.FC<Props> = ({ open, onClose }) => {
  const dispatch = useDispatch<AppDispatch>();
  const {
    isFetching: rdx_categoriesLeafsIsFetch,
    leafs: rdx_categoriesLeafs,
  } = useSelector<AppStore, { isFetching: boolean; leafs?: CategoryFull[] }>(
    (state) => state.categories.leafsZone
  );

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<Input>({
    resolver: yupResolver(schema),
    defaultValues: {
      price: 0.01,
    },
  });

  const submitHandler = useCallback(
    (data: Input) => {
      dispatch(ProductsThunks.createProduct(data)).then((res) => {
        if (!res.isError) {
          onClose();
        } else {
          handleServerErrors(combineServerErrors(undefined, res), setError);
        }
      });
    },
    [dispatch, setError, onClose]
  );

  return (
    <Dialog open={open} onClose={onClose} maxWidth={"sm"} fullWidth>
      <DialogTitle onClose={onClose}>Create new product</DialogTitle>
      <DialogContent>
        <Form onSubmit={handleSubmit(submitHandler)}>
          <Line direction={"column"} spacing={2}>
            <div>
              <Typography variant={"caption"}>Category</Typography>
              <Controller
                control={control}
                name={"categoryId"}
                render={({ field }) => (
                  <Autocomplete
                    options={rdx_categoriesLeafs ?? []}
                    loading={rdx_categoriesLeafsIsFetch}
                    value={
                      rdx_categoriesLeafs?.find((x) => x.id === field.value) ??
                      null
                    }
                    placeholder={"Please select a category"}
                    getOptionLabel={(x) => x.name}
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
                defaultValue={""}
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
                defaultValue={0.01}
                inputMode={"decimal"}
                fullWidth
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
                defaultValue={""}
                rows={7}
                fullWidth
                multiline
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
                  type={"submit"}
                  fullWidth
                  variant={"contained"}
                  color={"primary"}
                >
                  Submit
                </Button>
              </Grid>
              <Grid item sm={6}>
                <Button onClick={onClose} fullWidth variant={"outlined"}>
                  Cancel
                </Button>
              </Grid>
            </Grid>
          </Line>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
