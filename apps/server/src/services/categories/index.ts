import { categories, db, eq, insertCategory } from "@workspace/db";

class CategoryService {
  async updateCategory(categoryId: string, data: Partial<insertCategory>) {
    const [category] = await db
      .update(categories)
      .set(data)
      .where(eq(categories.id, categoryId))
      .returning({ id: categories.id, name: categories.name });
    return category;
  }

  async getCategoriesChildren(categoryId: string) {
    const category = await db.query.categories.findFirst({
      where: eq(categories.id, categoryId),
      with: {
        subcategories: true,
      },
    });
    return category;
  }

  async getCategories() {
    const categories = await db.query.categories.findMany({
      where: (categories, { isNull }) => isNull(categories.parentId),
      with: {
        subcategories: true,
      },
    });
    return categories;
  }

  async getCategoryById(id: string) {
    const [category] = await db
      .select()
      .from(categories)
      .where(eq(categories.id, id));
    return category;
  }

  async addCategory(data: insertCategory) {
    const [category] = await db
      .insert(categories)
      .values(data)
      .returning({ id: categories.id, name: categories.name });
    return category;
  }
}

export default CategoryService;
