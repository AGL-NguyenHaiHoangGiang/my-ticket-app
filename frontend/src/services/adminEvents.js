import adminApi from './adminApi';

class AdminEventService {
    // Get all events
    async getAll(limit = 99999) {
        const response = await adminApi.get(`/event/all?limit=${limit}`);
        return response.data;
    }

    // Get event by ID
    async getById(id) {
        const response = await adminApi.get(`/event/id/${id}`);
        return response.data;
    }

    // Add a new event
    async addEvent(eventData) {
        const response = await adminApi.post(`/event/new`, eventData);
        return response.data;
    }

    // Delete an event by ID
    async deleteEvent(id) {
        const response = await adminApi.delete(`/event/id/${id}`);
        return response.data;
    }

    // Update an event by ID
    async updateEvent(id, eventData) {
        const response = await adminApi.put(`/event/id/${id}`, eventData);
        return response.data;
    }
  
}

export default new AdminEventService();