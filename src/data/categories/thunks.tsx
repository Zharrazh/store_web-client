import { AppThunk } from "../store";
import { CategoriesActions } from "./actions";
import { CategoriesAPI } from "./api";
import { AjaxError } from "rxjs/ajax";
import { CreateUpdateCategoryRequest } from "./models";

const getCategoriesTreeAsync = (): AppThunk => {
  return async (dispatch) => {
    try {
      dispatch(CategoriesActions.setIsFetching(true));
      const tree = await CategoriesAPI.getCategoriesTree().toPromise();
      dispatch(CategoriesActions.setCategoryTree(tree));
      dispatch(CategoriesActions.setIsFetching(false));
      return {
        isError: false,
        data: tree,
      };
    } catch (e) {
      const error = e as AjaxError;
      return {
        isError: true,
        code: error.status,
        data: error.response,
      };
    }
  };
};

const getCategoryFullAsync = (id: number): AppThunk => {
  return async (dispatch) => {
    try {
      const category = await CategoriesAPI.getCategoryFull(id).toPromise();
      return {
        isError: false,
        data: category,
      };
    } catch (e) {
      const error = e as AjaxError;
      return {
        isError: true,
        code: error.status,
        data: error.response,
      };
    }
  };
};

const updateCategoryAsync = (
  id: number,
  data: CreateUpdateCategoryRequest
): AppThunk => {
  return async (dispatch) => {
    try {
      const resultCategory = await CategoriesAPI.updateCategory(
        id,
        data
      ).toPromise();
      return { isError: false, data: resultCategory };
    } catch (e) {
      const error = e as AjaxError;
      return {
        isError: true,
        code: error.status,
        data: error.response,
      };
    }
  };
};

const updateCategoryPicAsync = (id: number, file: File): AppThunk => {
  return async (dispatch) => {
    try {
      await CategoriesAPI.updateCategoryPic(id, file).toPromise();
      return { isError: false };
    } catch (e) {
      const error = e as AjaxError;
      return {
        isError: true,
        code: error.status,
        data: error.response,
      };
    }
  };
};
const createCategoryAsync = (data: CreateUpdateCategoryRequest): AppThunk => {
  return async (dispatch) => {
    try {
      const category = await CategoriesAPI.createCategory(data).toPromise();
      return { isError: false, data: category };
    } catch (e) {
      const error = e as AjaxError;
      return {
        isError: true,
        code: error.status,
        data: error.response,
      };
    }
  };
};

const deleteCategoryAsync = (id: number): AppThunk => {
  return async (dispatch) => {
    try {
      await CategoriesAPI.deleteCategory(id).toPromise();
      return { isError: false };
    } catch (e) {
      const error = e as AjaxError;
      return {
        isError: true,
        code: error.status,
        data: error.response,
      };
    }
  };
};

export const CategoriesAsyncActions = {
  getCategoriesTreeAsync,
  getCategoryFullAsync,
  updateCategoryAsync,
  updateCategoryPicAsync,
  createCategoryAsync,
  deleteCategoryAsync,
};
