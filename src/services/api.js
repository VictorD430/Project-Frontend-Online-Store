export async function getCategories() {
  const requestCategories = await fetch('https://api.mercadolibre.com/sites/MLB/categories');
  const data = await requestCategories.json();
  return data;
}

export async function getProductsFromCategoryAndQuery(categoryId, query) {
  const requestCategoriesQuery = await fetch(`https://api.mercadolibre.com/sites/MLB/search?category=${categoryId}&q=${query}`)
    .then((response) => response.json())
    .then((result) => result);
  return requestCategoriesQuery;
}

export async function getProductById(id) {
  const requestById = await fetch(` https://api.mercadolibre.com/items/${id}`);
  const dataId = await requestById.json();
  return dataId;
}
