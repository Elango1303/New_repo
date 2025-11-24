import productsData from '../../scripts/products.json';

export function getProductsByCategory(category: string) {
  // Normalize category for matching
  const normalizedCategory = category.trim().toLowerCase();
  return productsData.filter((product: any) => {
    // Infer category from image path or add a 'category' field in products.json if available
    if (product.image_url) {
      const match = product.image_url.match(/images\/(\w+)/i);
      if (match && match[1].toLowerCase() === normalizedCategory) {
        return true;
      }
    }
    // If product has a 'category' field, use that
    if (product.category && product.category.toLowerCase() === normalizedCategory) {
      return true;
    }
    return false;
  });
}

export function getImagePath(product: any) {
  // Assume images are downloaded to public/images/[category]/[filename]
  // Use lowercase filename
  if (product.image_url) {
    const urlParts = product.image_url.split('/');
    const filename = urlParts[urlParts.length - 1].toLowerCase();
    // Infer category from filename or product data
    let category = 'other';
    if (product.category) {
      category = product.category.toLowerCase();
    } else if (product.image_url.match(/images\/(\w+)/i)) {
      category = product.image_url.match(/images\/(\w+)/i)[1].toLowerCase();
    }
    return `/images/${category}/${filename}`;
  }
  return '';
}
