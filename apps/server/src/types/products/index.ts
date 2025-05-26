export interface updateProductReq {
  productId: string;
  name: string;
  description: string;
  categoryId: string;
  hasVariants: boolean;
  metaTitle?: string;
  metaDescription?: string;
}

export interface addProductReq {
  name: string;
  description: string;
  categoryId: string;
  hasVariants: boolean;
  metaTitle?: string;
  metaDescription?: string;
}
