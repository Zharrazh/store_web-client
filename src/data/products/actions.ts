import { action } from "typesafe-actions";
import { PageResponse } from "../common/models";
import { Product } from "./models";
import { ActionType } from "typesafe-actions/dist/type-helpers";

export enum ProductsActionNames {
  PRODUCTS_PAGE_IS_FETCHING_SET = "PRODUCTS_PAGE_IS_FETCHING_SET",
  PRODUCTS_PAGE_SET = "PRODUCTS_PAGE_SET",
}

const setIsFetching = (isFetching: boolean) =>
  action(ProductsActionNames.PRODUCTS_PAGE_IS_FETCHING_SET, isFetching);
const setPage = (page: PageResponse<Product>) =>
  action(ProductsActionNames.PRODUCTS_PAGE_SET, page);

export const ProductsActions = {
  setIsFetching,
  setPage,
};

export type ProductsActionType = ActionType<typeof ProductsActions>;
