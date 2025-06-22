export const getCategoryWiseProducts = (products, categories) => {
  if (!categories.length) return products; // Return all products if no categories selected

  return products.filter((product) =>
    categories.some((category) => 
      product.category_name && 
      product.category_name.toUpperCase() === category.toUpperCase()
    )
  );
};