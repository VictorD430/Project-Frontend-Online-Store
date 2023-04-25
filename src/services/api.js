export async function getCategories() {
  const requestCategories = await fetch('https://api.mercadolibre.com/sites/MLB/categories');
  const data = await requestCategories.json();
  return data;
}

export async function getProductsFromCategoryAndQuery(categoryId, query) {
  if (categoryId.length > 0 && query.length > 0) {
    const requestCategoriesQuery = await fetch(`https://api.mercadolibre.com/sites/MLB/search?category=${categoryId}&q=${query}`);
    const dataCategoriesQuery = await requestCategoriesQuery.json();
    return dataCategoriesQuery;
  }
  if (query.length > 0) {
    const requestQuery = await fetch(`https://api.mercadolibre.com/sites/MLB/search?q=${query}`);
    const dataQuery = await requestQuery.json();
    return dataQuery;
  }
  if (categoryId.length > 0) {
    const requestCategories = await fetch(` https://api.mercadolibre.com/sites/MLB/search?category=${categoryId}`);
    const dataCategories = await requestCategories.json();
    return dataCategories;
  }
}

export async function getProductById(id) {
  const requestById = await fetch(` https://api.mercadolibre.com/items/${id}`);
  const dataId = await requestById.json();
  return dataId;
}
