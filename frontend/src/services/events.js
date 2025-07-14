import axios from "axios";

class EventService {
    constructor() {
        this.api = axios.create({
            baseURL: "http://localhost:3052/api/v0/event",
        });
    }

    async getAll(limit = 10, page = 1, category = '', startDate = null, endDate = null, location = 'all', isFree = false) {
        const params = {
            limit,
            page,
        };

        if (category) {
            params.category = category;
        }

        if (startDate) {
            params.startDate = startDate;
        }

        if (endDate) {
            params.endDate = endDate;
        }

        if (location && location !== 'all') {
            params.location = location;
        }

        if (isFree) {
            params.isFree = isFree;
        }

        const response = await this.api.get(`/all`, { params });
        return response.data;
    }

    async getBySlug(slug) {
        const response = await this.api.get(`/slug/${slug}`);
        console.log('Response data:', response.data);
        return response.data;
    }
}

export default new EventService();