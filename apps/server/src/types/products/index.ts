export interface updateProductReq {
  productId: string;
  name: string;
  description: string;
  categoryId: string;
  hasVariants: boolean;
  metaTitle?: string;
  metaDescription?: string;
}

export interface addProductVariantReq {
  productId: string;
  costPrice: number;
  salePrice: number;
  price: number;
  stock: number;
  isDefault: boolean;
  attributeValueIds?: string[];
}

export interface addProductReq {
  name: string;
  description: string;
  categoryId: string;
  hasVariants: boolean;
  metaTitle?: string;
  metaDescription?: string;
  attributeIds?: string[];
}
