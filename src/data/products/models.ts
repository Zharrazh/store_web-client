import { PictureInfo } from "../common/models";

export type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
  categoryId: number;
  pics: PictureInfo[];
};

export type CreateProductModel = {
  name: string;
  price: number;
  categoryId: number;
  description: string;
};

export type UpdateProductModel = {
  name: string;
  price: number;
  categoryId: number;
  description: string;
};
