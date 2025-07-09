import axios from "axios";

class EventService {
    constructor() {
        this.api = axios.create({
            baseURL: "http://localhost:3052/api/v0/event",
        });
    }

    async getAll(limit = 10, page = 1, category = '', startDate = null, endDate = null) {
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

        const response = await this.api.get(`/all`, { params });
        return response.data;
    }

    async getBySlug(slug) {
        const response = await this.api.get(`/:${slug}`);
        return response.data;
    }
}

export default new EventService();