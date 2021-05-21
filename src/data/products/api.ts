import { http } from "../../utils/http";
import { PageResponse, SieveModel } from "../common/models";
import { CreateProductModel, Product, UpdateProductModel } from "./models";

const getProductsPage = (sieve: SieveModel) => {
  return http.get<PageResponse<Product>>("Products", sieve);
};

const createProduct = (product: CreateProductModel) => {
  return http.post<Product>("Products", product);
};

const getProduct = (id: number) => {
  return http.get<Product>(`Products/${id}`);
};

const updateProduct = (id: number, data: UpdateProductModel) => {
  return http.put<Product>(`Products/${id}`, data);
};

const deleteProduct = (id: number) => {
  return http.delete<void>(`Products/${id}`);
};

export const ProductsAPI = {
  getProductsPage,
  createProduct,
  getProduct,
  updateProduct,
  deleteProduct,
};
