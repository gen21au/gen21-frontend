import CategoryPage from '@/components/Services/CategoryPage';
import { CategoryService } from '@/services/categoryService';

interface CategoryRouteProps {
  params: Promise<{ slug: string }>;
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
}

export default async function CategoryRoute({ params, searchParams }: CategoryRouteProps) {
  const { slug } = await params;  // ✅ required because params is Promise

  // Extract category ID from slug (e.g., "cleaning-service-12" -> 12)
  const categoryId = CategoryService.extractCategoryIdFromSlug(slug);

  if (!categoryId) {
    return (
      <div className="bg-gray-50 min-h-screen pb-16">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Invalid Category</h1>
            <p className="text-gray-600">The category slug is invalid.</p>
          </div>
        </div>
      </div>
    );
  }

  return <CategoryPage categoryId={categoryId} />;
}
