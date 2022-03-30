import axios from 'axios';

class OrdersService {
    async getAll() {
        const response = axios.get('/api/orders');
        return response;
    }

    async get(id) {
        const response = axios.get(`/api/orders/${id}`);

        return response?.data;
    }

    async create(order) {
        
        const response = axios.post(`/api/orders`, order);

        return response?.data;
    }
}

export const ordersService = new OrdersService();