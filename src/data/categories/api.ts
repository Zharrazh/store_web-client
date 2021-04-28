import { http } from "../../utils/http";
import {
  CategoryFull,
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

export const CategoriesAPI = {
  getCategoriesTree,
  getCategoryFull,
  createCategory,
  updateCategory,
  updateCategoryPic,
  deleteCategory,
};
