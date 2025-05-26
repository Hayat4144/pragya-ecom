export interface updateCategoryReq {
  name: string;
  imageUrl: string;
  categoryId: string;
}

export interface addCategoryReq {
  name: string;
  imageUrl: string;
  parentId?: string;
}
