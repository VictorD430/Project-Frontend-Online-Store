export async function getCategories() {
  const requestCategories = await fetch('https://api.mercadolibre.com/sites/MLB/categories');
  const data = await requestCategories.json();
  return data;
}

export async function getProductsFromCategoryAndQuery(categoryId, query) {
  const requestCategories = await fetch(` https://api.mercadolibre.com/sites/MLB/search?category=${categoryId}`);
  const dataCategories = await requestCategories.json();

  const requestQuery = await fetch(`https://api.mercadolibre.com/sites/MLB/search?q=${query}`);
  const dataQuery = await requestQuery.json();

  const requestCategoriesQuery = await fetch(`https://api.mercadolibre.com/sites/MLB/search?category=${categoryId}&q=${query}`);
  const dataCategoriesQuery = await requestCategoriesQuery.json();

  if (categoryId.length > 0 && query.length > 0) {
    return dataCategoriesQuery;
  }
  if (query.length > 0) {
    return dataQuery;
  }
  if (categoryId.length > 0) {
    return dataCategories;
  }
}

export async function getProductById() {
  // Esta implementação específica não é avaliada, mas pode ajudar você 🙂
  // Atenção: essa função não deverá ser chamada na tela do carrinho de compras.
}
