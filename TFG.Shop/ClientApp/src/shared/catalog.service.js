import axios from "axios";

class CatalogService {
    async getAllCategories() {
        const response = await axios.get('/api/categories');

        return response?.data;
    }

    async getCategoryProducts(categoryId) {
        const response = await axios.get(`/api/products/bycategory/${categoryId}`);

        return response?.data;
    }
}

export const catalogService = new CatalogService();