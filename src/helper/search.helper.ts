import { CategoryType, EServiceType } from "@/types/services";

// Generate service slug
export function generateServiceSlug(name: string, id: number): string {
    return `${name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')}-${id}`;
}

export const getThumbnail = (item: CategoryType | EServiceType) => {
    if (item.media && item.media.length > 0) {
      return item?.media[0]?.url;
    }
    return '/images/default-service.png';
};