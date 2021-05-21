export type PictureInfo = {
  id: number;
  path: string;
  fileName: string;
};

export type SieveModel = {
  filters?: string;
  sorts?: string;
  page?: number;
  pageSize?: number;
};

export type PageResponse<T> = {
  items: T[];
  pageInfo: PageInfo;
};

type PageInfo = {
  totalPages: number;
  totalItems: number;
  currentPage: number;
  pageSize: number;
};
