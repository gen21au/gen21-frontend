// Helper function to generate slug from service name
export const generateSlug = (name: string, id: number) => {
    return `${name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')}-${id}`;
};