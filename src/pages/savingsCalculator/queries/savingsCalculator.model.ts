export const SAVINGS_CALCULATOR_ENDPOINT = {
  BASE: '/api',
  SAVINGS_PRODUCTS: () => `${SAVINGS_CALCULATOR_ENDPOINT.BASE}/savings-products`,
};

export const SAVINGS_CALCULATOR_QUERY_KEY = {
  SAVINGS_PRODUCTS: () => 'savings-products',
};
