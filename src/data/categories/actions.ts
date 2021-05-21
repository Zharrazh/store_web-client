import { action } from "typesafe-actions";
import { ActionType } from "typesafe-actions/dist/type-helpers";
import { CategoryFull, CategoryTree } from "./models";

export enum CategoriesActionNames {
  CATEGORIES_TREE_IS_FETCHING_SET = "CATEGORIES_TREE_IS_FETCHING_SET",
  CATEGORIES_TREE_SET = "CATEGORIES_TREE_SET",
  CATEGORIES_LEAFS_IS_FETCHING_SET = "CATEGORIES_LEAFS_IS_FETCHING_SET",
  CATEGORIES_LEAFS_SET = "CATEGORIES_LEAFS_SET",
}

const setTreeIsFetching = (value: boolean) =>
  action(CategoriesActionNames.CATEGORIES_TREE_IS_FETCHING_SET, value);

const setTree = (tree: CategoryTree) =>
  action(CategoriesActionNames.CATEGORIES_TREE_SET, tree);

const setLeafsIsFetching = (value: boolean) =>
  action(CategoriesActionNames.CATEGORIES_LEAFS_IS_FETCHING_SET, value);

const setLeafs = (categories: CategoryFull[]) =>
  action(CategoriesActionNames.CATEGORIES_LEAFS_SET, categories);

export const CategoriesActions = {
  setTreeIsFetching,
  setTree,
  setLeafsIsFetching,
  setLeafs,
};

export type CategoriesActionType = ActionType<typeof CategoriesActions>;
