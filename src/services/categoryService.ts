import { CategoryWithServices, CategoryType } from '@/types/services';

// Service functions for category operations
export class CategoryService {
  // Extract category ID from slug (e.g., "cleaning-service-12" -> 12)
  static extractCategoryIdFromSlug(slug: string): number | null {
    const idMatch = slug.match(/-(\d+)$/);
    return idMatch ? parseInt(idMatch[1], 10) : null;
  }

  // Generate slug from category name and ID
  static generateCategorySlug(name: string, id: number): string {
    return `${name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')}-${id}`;
  }

  // Filter services by category ID from all category services data
  static getServicesByCategoryId(allCategoryServices: CategoryWithServices[], categoryId: number) {
    const category = allCategoryServices.find(cat => cat.id === categoryId);
    return category ? category.services : [];
  }

  // Get category details with services combined
  static combineCategoryWithServices(category: CategoryType, allCategoryServices: CategoryWithServices[]) {
    const categoryServices = this.getServicesByCategoryId(allCategoryServices, category.id);
    return {
      ...category,
      services: categoryServices,
      totalServices: categoryServices.length
    };
  }
}
