import { action } from "typesafe-actions";
import { ActionType } from "typesafe-actions/dist/type-helpers";
import { CategoryTree } from "./models";

export enum CategoriesActionNames {
  CATEGORIES_SET_IS_FETCHING = "CATEGORIES_SET_IS_FETCHING",
  CATEGORIES_SET_CATEGORY_TREE = "CATEGORIES_SET_CATEGORY_TREE",
}

const setIsFetching = (value: boolean) =>
  action(CategoriesActionNames.CATEGORIES_SET_IS_FETCHING, value);

const setCategoryTree = (tree: CategoryTree) =>
  action(CategoriesActionNames.CATEGORIES_SET_CATEGORY_TREE, tree);

export const CategoriesActions = {
  setIsFetching,
  setCategoryTree,
};

export type CategoriesActionTypes = ActionType<typeof CategoriesActions>;
