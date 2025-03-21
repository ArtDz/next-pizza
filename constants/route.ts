export const Routes = {
  Home: '/',
  NotAuth: '/not-auth',
  Products: (id: number) => `/products/${id}`,
  ProductsSearch: '/products/search',
  Ingredients: '/ingredients',
  Cart: '/cart',
  Checkout: '/checkout',
}
