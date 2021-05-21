import { AppThunk } from "../store";
import { CategoriesActions } from "./actions";
import { CategoriesAPI } from "./api";
import { CreateUpdateCategoryRequest } from "./models";
import { thunkHandleError } from "../../utils/handleServerResult";

const getCategoriesTreeAsync = (): AppThunk => {
  return async (dispatch) => {
    try {
      dispatch(CategoriesActions.setTreeIsFetching(true));
      const tree = await CategoriesAPI.getCategoriesTree().toPromise();
      dispatch(CategoriesActions.setTree(tree));
      dispatch(CategoriesActions.setTreeIsFetching(false));
      return {
        isError: false,
        data: tree,
      };
    } catch (e) {
      return thunkHandleError(e);
    }
  };
};

const getCategoryFullAsync = (id: number): AppThunk => {
  return async (_) => {
    try {
      const category = await CategoriesAPI.getCategoryFull(id).toPromise();
      return {
        isError: false,
        data: category,
      };
    } catch (e) {
      return thunkHandleError(e);
    }
  };
};

const updateCategoryAsync = (
  id: number,
  data: CreateUpdateCategoryRequest
): AppThunk => {
  return async (_) => {
    try {
      const resultCategory = await CategoriesAPI.updateCategory(
        id,
        data
      ).toPromise();
      return { isError: false, data: resultCategory };
    } catch (e) {
      return thunkHandleError(e);
    }
  };
};

const updateCategoryPicAsync = (id: number, file: File): AppThunk => {
  return async (_) => {
    try {
      await CategoriesAPI.updateCategoryPic(id, file).toPromise();
      return { isError: false };
    } catch (e) {
      return thunkHandleError(e);
    }
  };
};
const createCategoryAsync = (data: CreateUpdateCategoryRequest): AppThunk => {
  return async (_) => {
    try {
      const category = await CategoriesAPI.createCategory(data).toPromise();
      return { isError: false, data: category };
    } catch (e) {
      return thunkHandleError(e);
    }
  };
};

const deleteCategoryAsync = (id: number): AppThunk => {
  return async (_) => {
    try {
      await CategoriesAPI.deleteCategory(id).toPromise();
      return { isError: false };
    } catch (e) {
      return thunkHandleError(e);
    }
  };
};

const getLeafs = (): AppThunk => {
  return async (dispatch) => {
    try {
      dispatch(CategoriesActions.setLeafsIsFetching(true));
      const res = await CategoriesAPI.getLeafs().toPromise();
      dispatch(CategoriesActions.setLeafs(res));
      return { isError: false, data: res };
    } catch (e) {
      return thunkHandleError(e);
    } finally {
      dispatch(CategoriesActions.setLeafsIsFetching(false));
    }
  };
};

const getPath = (id: number): AppThunk => {
  return async (_) => {
    try {
      const res = await CategoriesAPI.getPath(id).toPromise();
      return { isError: false, data: res };
    } catch (e) {
      return thunkHandleError(e);
    }
  };
};

export const CategoriesThunks = {
  getCategoriesTreeAsync,
  getCategoryFullAsync,
  updateCategoryAsync,
  updateCategoryPicAsync,
  createCategoryAsync,
  deleteCategoryAsync,
  getLeafs,
  getPath,
};
