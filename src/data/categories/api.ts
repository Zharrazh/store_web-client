import { http } from "../../utils/http";
import {
  CategoryFull,
  CategoryMin,
  CategoryTree,
  CreateUpdateCategoryRequest,
} from "./models";

const getCategoriesTree = () => {
  return http.get<CategoryTree>("Categories/tree");
};
const getCategoryFull = (id: number) => {
  return http.get<CategoryFull>(`Categories/${id}`);
};

const createCategory = (data: CreateUpdateCategoryRequest) => {
  return http.post<CategoryFull>("Categories", data);
};

const updateCategory = (id: number, data: CreateUpdateCategoryRequest) => {
  return http.put<CategoryFull>(`Categories/${id}`, data);
};

const updateCategoryPic = (id: number, file: File) => {
  const formData = new FormData();
  formData.append("file", file);
  return http.put<void>(
    `Categories/${id}/pic`,
    formData,
    undefined,
    undefined,
    true
  );
};

const deleteCategory = (id: number) => {
  return http.delete(`Categories/${id}`);
};

const getLeafs = () => {
  return http.get<CategoryFull[]>("Categories", { type: 1 });
};

const getPath = (id: number) => {
  return http.get<CategoryMin[]>(`Categories/path/${id}`);
};

export const CategoriesAPI = {
  getCategoriesTree,
  getCategoryFull,
  createCategory,
  updateCategory,
  updateCategoryPic,
  deleteCategory,
  getLeafs,
  getPath,
};
