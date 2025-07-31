import axios from "axios";

class OrderService {
    constructor() {
        this.api = axios.create({
            baseURL: "http://localhost:3052/api/v0/order",
        });
    }

    async create_payment_url(description, tickets, amount, eventId, fullname, tele, email, token) {
        try {
            if (!token) {
                throw new Error('Authentication token is required');
            }

            const payload = {
                description,
                tickets,
                amount: Number(amount),
                eventId,
                fullname,
                tele,
                email
            };

            console.log('Payment request payload:', payload);

            const response = await this.api.post('/create_payment_url', payload, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            });

            return response.data;
        } catch (error) {
            console.error('OrderService.create_payment_url error:', error);
        }
    }

    async getTransaction(id, token) {
        try {
            if (!token) {
                throw new Error('Authentication token is required');
            }

            const response = await this.api.get(`/trans-info/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            return response.data;
        } catch (error) {
            console.error('OrderService.getTransaction error:', error);
        }
    }

}

export default new OrderService();