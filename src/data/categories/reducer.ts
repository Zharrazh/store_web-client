import { CategoriesActionNames, CategoriesActionTypes } from "./actions";
import { CategoryTree } from "./models";

export type CategoriesState = {
  isFetching: boolean;
  tree?: CategoryTree;
};
const init: CategoriesState = {
  isFetching: false,
};

export const CategoriesReducer = (
  state = init,
  action: CategoriesActionTypes
): CategoriesState => {
  switch (action.type) {
    case CategoriesActionNames.CATEGORIES_SET_IS_FETCHING:
      return { ...state, isFetching: action.payload };
    case CategoriesActionNames.CATEGORIES_SET_CATEGORY_TREE:
      return { ...state, tree: action.payload };
  }
  return state;
};
