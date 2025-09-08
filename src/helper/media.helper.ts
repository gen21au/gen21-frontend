// Define MediaItem type (based on your sample object)
interface MediaItem {
    id: number;
    collection_name: string;
    url: string;
    thumb?: string;
    icon?: string;
    name?: string;
    [key: string]: any; // Allow extra properties (like custom_properties, etc.)
  }
  
  // Define Model type with media
  interface ModelWithMedia {
    media?: MediaItem[];
    has_media?: boolean;
    [key: string]: any;
  }
  
  /**
   * Get media URL from a model object
   *
   * @param model - The model object (with `media` array).
   * @param collectionName - The collection name to filter (e.g. "avatar").
   * @param conversion - Which conversion to use ("thumb" | "icon" | "url").
   * @param defaultImage - Fallback image URL.
   * @returns string - The media URL.
   */
  export function getMediaUrl(
    model: ModelWithMedia | null | undefined,
    collectionName: string = "avatar",
    conversion: "thumb" | "icon" | "url" = "icon",
    defaultImage: string = "/images/image_default.png"
  ): string {
    if (!model || !Array.isArray(model.media)) {
      return defaultImage;
    }
  
    const mediaItem = model.media.find(
      (m: MediaItem) => m.collection_name === collectionName
    );
  
    if (!mediaItem) {
      return defaultImage;
    }
  
    switch (conversion) {
      case "thumb":
        return mediaItem.thumb ?? mediaItem.url ?? defaultImage;
      case "icon":
        return mediaItem.icon ?? mediaItem.url ?? defaultImage;
      default:
        return mediaItem.url ?? defaultImage;
    }
  }
  