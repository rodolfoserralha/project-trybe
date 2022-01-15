export async function getCategories() {
  // Implemente aqui
  const response = await fetch('https://api.mercadolibre.com/sites/MLB/categories');
  const categories = await response.json();
  return categories;
}

export async function getProductsFromCategoryAndQuery(categoryId, query) {
  // Implemente aqui! Quando o fizer, descomente os parâmetros que essa função recebe
  if (categoryId && query) {
    const getCategoryAndQuery = await fetch(`https://api.mercadolibre.com/sites/MLB/search?category=${categoryId}&q=${query}`);
    const categoryAndQuery = await getCategoryAndQuery.json();
    return categoryAndQuery;
  }

  if (categoryId) {
    const getCategory = await fetch(`https://api.mercadolibre.com/sites/MLB/search?category=${categoryId}`);
    const category = await getCategory.json();
    return category;
  }

  if (query) {
    const getQuery = await fetch(`https://api.mercadolibre.com/sites/MLB/search?q=${query}`);
    const queries = await getQuery.json();
    return queries;
  }
}
