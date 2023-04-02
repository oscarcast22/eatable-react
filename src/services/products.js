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

  async updateProduct(productData, productID) {
    try {
      const response = await apiFetch(`/products/${productID}`, {method: "PATCH", body:productData});
      console.log(response)
      return response;
    } catch (error) {
      console.error(error);
    }
  },

  async createProduct(productData) {
    try {
      const response = await apiFetch(`/products`, {method: "POST", body:productData});
      console.log(response);
      return response;
    } catch (error) {
      console.error(error);
    }
  },
};

export default Products;
