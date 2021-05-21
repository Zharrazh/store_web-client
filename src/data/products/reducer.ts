import { PageResponse } from "../common/models";
import { ProductsActionNames, ProductsActionType } from "./actions";
import { Product } from "./models";

export type ProductsState = {
  productPage: {
    isFetching: boolean;
    page?: PageResponse<Product>;
  };
};
const init: ProductsState = {
  productPage: {
    isFetching: false,
  },
};

export const ProductsReducer = (
  state = init,
  action: ProductsActionType
): ProductsState => {
  switch (action.type) {
    case ProductsActionNames.PRODUCTS_PAGE_IS_FETCHING_SET:
      return {
        ...state,
        productPage: { ...state.productPage, isFetching: action.payload },
      };
    case ProductsActionNames.PRODUCTS_PAGE_SET:
      return {
        ...state,
        productPage: { ...state.productPage, page: action.payload },
      };
  }
  return state;
};
