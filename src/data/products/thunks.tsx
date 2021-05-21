import { AppThunk } from "../store";
import { SieveModel } from "../common/models";
import { ProductsActions } from "./actions";
import { ProductsAPI } from "./api";
import { thunkHandleError } from "../../utils/handleServerResult";
import { CreateProductModel, UpdateProductModel } from "./models";

const getProductPage = (sieve: SieveModel): AppThunk => {
  return async (dispatch) => {
    dispatch(ProductsActions.setIsFetching(true));
    try {
      const res = await ProductsAPI.getProductsPage(sieve).toPromise();
      dispatch(ProductsActions.setPage(res));
      return {
        isError: false,
        data: res,
      };
    } catch (e) {
      return thunkHandleError(e);
    } finally {
      dispatch(ProductsActions.setIsFetching(false));
    }
  };
};

const createProduct = (product: CreateProductModel): AppThunk => {
  return async () => {
    try {
      const res = await ProductsAPI.createProduct(product).toPromise();
      return {
        isError: false,
        data: res,
      };
    } catch (e) {
      return thunkHandleError(e);
    }
  };
};

const getProduct = (id: number): AppThunk => {
  return async () => {
    try {
      const res = await ProductsAPI.getProduct(id).toPromise();
      return { isError: false, data: res };
    } catch (e) {
      return thunkHandleError(e);
    }
  };
};

const updateProduct = (id: number, data: UpdateProductModel): AppThunk => {
  return async () => {
    try {
      const res = await ProductsAPI.updateProduct(id, data).toPromise();
      return { isError: false, data: res };
    } catch (e) {
      return thunkHandleError(e);
    }
  };
};

const deleteProduct = (id: number): AppThunk => {
  return async () => {
    try {
      await ProductsAPI.deleteProduct(id).toPromise();
      return { isError: false };
    } catch (e) {
      return thunkHandleError(e);
    }
  };
};

export const ProductsThunks = {
  getProductPage,
  createProduct,
  getProduct,
  updateProduct,
  deleteProduct,
};
