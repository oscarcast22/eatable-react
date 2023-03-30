import apiFetch from './api-fetch';

const Products = {
  async get() {
    try {
      const response = await apiFetch('/products');
      return response;
    } catch (error) {
      console.error(error);
      return false;
    }
  },

  async getProduct(id) {
    try {
      const response = await apiFetch(`/products/${id}`);
      return response;
    } catch (error) {
      console.error(error);
    }
  },
};

export default Products;
