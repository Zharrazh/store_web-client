import { PictureInfo } from "../common/models";

export type CategoryTreeElement = {
  id: number;
  name: string;
  isNode: boolean;
  childCategories?: CategoryTreeElement[];
};

export type CategoryTree = {
  rootCategories: CategoryTreeElement[];
};

export type CreateUpdateCategoryRequest = {
  isNode: boolean;
  name: string;
  description: string;
  parentId: number | null;
};

export type CategoryMin = {
  id: number;
  isNode: boolean;
  name: string;
};

export type CategoryFull = {
  id: number;
  isNode: boolean;
  name: string;
  description: string;
  parentId: number | null;
  pic?: PictureInfo;
  childCategories?: CategoryMin[];
};
