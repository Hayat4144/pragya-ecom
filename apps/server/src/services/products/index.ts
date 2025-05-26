import { db, eq, insertProduct, products } from "@workspace/db";

class ProductService {
  async updateProduct(productId: string, data: Partial<insertProduct>) {
    const [product] = await db
      .update(products)
      .set(data)
      .where(eq(products.id, productId))
      .returning({ id: products.id, name: products.name });
    return product;
  }
  async getProducts() {
    const products = await db.query.products.findMany();
    return products;
  }
  async addProduct(data: insertProduct) {
    const [product] = await db
      .insert(products)
      .values(data)
      .returning({ id: products.id, name: products.name });

    return product;
  }
}

export default ProductService;
