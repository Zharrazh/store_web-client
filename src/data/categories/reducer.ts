import { CategoriesActionNames, CategoriesActionType } from "./actions";
import { CategoryFull, CategoryTree } from "./models";

export type CategoriesState = {
  treeZone: {
    isFetching: boolean;
    tree?: CategoryTree;
  };
  leafsZone: {
    isFetching: boolean;
    leafs?: CategoryFull[];
  };
};
const init: CategoriesState = {
  treeZone: {
    isFetching: false,
  },
  leafsZone: {
    isFetching: false,
  },
};

export const CategoriesReducer = (
  state = init,
  action: CategoriesActionType
): CategoriesState => {
  switch (action.type) {
    case CategoriesActionNames.CATEGORIES_TREE_IS_FETCHING_SET:
      return {
        ...state,
        treeZone: { ...state.treeZone, isFetching: action.payload },
      };
    case CategoriesActionNames.CATEGORIES_TREE_SET:
      return {
        ...state,
        treeZone: { ...state.treeZone, tree: action.payload },
      };
    case CategoriesActionNames.CATEGORIES_LEAFS_IS_FETCHING_SET:
      return {
        ...state,
        leafsZone: { ...state.leafsZone, isFetching: action.payload },
      };
    case CategoriesActionNames.CATEGORIES_LEAFS_SET:
      return {
        ...state,
        leafsZone: { ...state.leafsZone, leafs: action.payload },
      };
  }
  return state;
};
